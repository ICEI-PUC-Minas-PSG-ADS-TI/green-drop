-- 0. Catálogo de quests
CREATE TABLE quest (
  id            VARCHAR PRIMARY KEY,        -- ex: 'daily-login'
  title         VARCHAR NOT NULL,           -- ex: 'Login diário'
  description   TEXT,                       -- ex: 'Faça login todos os dias para ganhar recompensas'
  quest_type    VARCHAR,                    -- ex: 'DAILY', 'EVENT', 'STORY'
  reward        JSONB,                      -- ex: { "xp":100, "coins":50 }
  start_at      TIMESTAMPTZ,                -- opcional: quando a quest começa a valer
  end_at        TIMESTAMPTZ,                -- opcional: fim da disponibilidade
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1. Catálogo de achievements (agora atrelado a quests)
CREATE TABLE achievement (
  id            VARCHAR PRIMARY KEY,        -- ex: 'hat-trick'
  quest_id      VARCHAR NOT NULL            -- link para a missão
                REFERENCES quest(id)
                ON DELETE CASCADE,
  title         VARCHAR NOT NULL,
  description   TEXT,
  goal_type     VARCHAR NOT NULL,           -- ex: 'QUEST', 'CUMULATIVE'
  goal_count    INT NOT NULL                -- quantas sub-metas necessárias (ex: 3)
);

-- 2. Sub-metas de cada achievement
CREATE TABLE achievement_goals (
  id              SERIAL PRIMARY KEY,
  achievement_id  VARCHAR NOT NULL
                   REFERENCES achievement(id)
                   ON DELETE CASCADE,
  title           VARCHAR NOT NULL,         -- ex: 'Infra'
  description     TEXT,
  target          INT NOT NULL              -- ex: 1
);

-- 3. Progresso de cada sub-meta por usuário
CREATE TABLE user_achievement_progress (
  user_id         UUID NOT NULL,
  achievement_id  VARCHAR NOT NULL
                   REFERENCES achievement(id),
  goal_id         INT     NOT NULL
                   REFERENCES achievement_goals(id),
  current         INT     NOT NULL DEFAULT 0,
  done            BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY(user_id, goal_id)
);

-- 4. Registro de unlocks
CREATE TABLE user_achievements (
  user_id         UUID NOT NULL,
  achievement_id  VARCHAR NOT NULL
                   REFERENCES achievement(id),
  unlocked        BOOLEAN NOT NULL DEFAULT FALSE,
  unlocked_at     TIMESTAMPTZ,
  PRIMARY KEY(user_id, achievement_id)
);
