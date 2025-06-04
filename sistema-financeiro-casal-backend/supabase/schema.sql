-- Criando tabelas no Supabase

-- Tabela de usuários (extensão da tabela auth.users do Supabase)
CREATE TABLE public.usuarios (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    avatar_url TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contas (compartilhadas entre casais)
CREATE TABLE public.contas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    saldo_inicial DECIMAL(15, 2) NOT NULL DEFAULT 0,
    saldo_atual DECIMAL(15, 2) NOT NULL DEFAULT 0,
    usuario1_id UUID NOT NULL REFERENCES public.usuarios(id),
    usuario2_id UUID REFERENCES public.usuarios(id),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações
CREATE TABLE public.transacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    descricao VARCHAR(200) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL CHECK (valor > 0),
    data DATE NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
    categoria VARCHAR(50) NOT NULL,
    conta_id UUID NOT NULL REFERENCES public.contas(id),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar consultas
CREATE INDEX idx_transacoes_conta_id ON public.transacoes(conta_id);
CREATE INDEX idx_transacoes_usuario_id ON public.transacoes(usuario_id);
CREATE INDEX idx_transacoes_data ON public.transacoes(data);
CREATE INDEX idx_transacoes_categoria ON public.transacoes(categoria);

-- Trigger para atualizar saldo da conta quando há nova transação
CREATE OR REPLACE FUNCTION atualizar_saldo_conta()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual + NEW.valor WHERE id = NEW.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual - NEW.valor WHERE id = NEW.conta_id;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual - OLD.valor WHERE id = OLD.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual + OLD.valor WHERE id = OLD.conta_id;
        END IF;
        
        IF NEW.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual + NEW.valor WHERE id = NEW.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual - NEW.valor WHERE id = NEW.conta_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual - OLD.valor WHERE id = OLD.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual + OLD.valor WHERE id = OLD.conta_id;
        END IF;
    END IF;
    
    UPDATE contas SET ultima_atualizacao = CURRENT_TIMESTAMP WHERE id = COALESCE(NEW.conta_id, OLD.conta_id);
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_atualizar_saldo_conta
AFTER INSERT OR UPDATE OR DELETE ON public.transacoes
FOR EACH ROW EXECUTE FUNCTION atualizar_saldo_conta();

-- Função para retornar resumo por categoria
CREATE OR REPLACE FUNCTION resumo_por_categoria(p_conta_id UUID, p_data_inicio DATE DEFAULT NULL, p_data_fim DATE DEFAULT NULL)
RETURNS TABLE (
    categoria VARCHAR(50),
    total_entradas DECIMAL(15, 2),
    total_saidas DECIMAL(15, 2),
    saldo DECIMAL(15, 2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.categoria,
        COALESCE(SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.valor ELSE 0 END), 0) as total_entradas,
        COALESCE(SUM(CASE WHEN t.tipo = 'SAIDA' THEN t.valor ELSE 0 END), 0) as total_saidas,
        COALESCE(SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.valor ELSE -t.valor END), 0) as saldo
    FROM 
        transacoes t
    WHERE 
        t.conta_id = p_conta_id
        AND (p_data_inicio IS NULL OR t.data >= p_data_inicio)
        AND (p_data_fim IS NULL OR t.data <= p_data_fim)
    GROUP BY 
        t.categoria
    ORDER BY 
        ABS(saldo) DESC;
END;
$$ LANGUAGE plpgsql;

-- Políticas de Row Level Security (RLS)
-- Habilita RLS nas tabelas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Política para usuários (apenas o próprio usuário pode ver/editar seus dados)
CREATE POLICY usuarios_policy ON public.usuarios
    USING (auth.uid() = id);

-- Política para contas (usuários podem ver/editar apenas contas onde são participantes)
CREATE POLICY contas_policy ON public.contas
    USING (auth.uid() = usuario1_id OR auth.uid() = usuario2_id);

-- Política para transações (usuários podem ver/editar apenas transações de contas onde são participantes)
CREATE POLICY transacoes_policy ON public.transacoes
    USING (
        EXISTS (
            SELECT 1 FROM contas c
            WHERE c.id = conta_id
            AND (auth.uid() = c.usuario1_id OR auth.uid() = c.usuario2_id)
        )
    );