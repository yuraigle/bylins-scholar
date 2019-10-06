-- DROP ALL
DROP TABLE IF EXISTS public.reagents CASCADE;
DROP SEQUENCE IF EXISTS public.reagent_id_seq;

DROP TABLE IF EXISTS public.rooms CASCADE;
DROP SEQUENCE IF EXISTS public.room_id_seq;

DROP TABLE IF EXISTS public.mobs CASCADE;
DROP SEQUENCE IF EXISTS public.mob_id_seq;

DROP TABLE IF EXISTS public.zones CASCADE;
DROP SEQUENCE IF EXISTS public.zone_id_seq;

-- Table: public.zones

CREATE SEQUENCE public.zone_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.zones
(
    id    integer               NOT NULL DEFAULT nextval('zone_id_seq'::regclass),
    n     integer               NOT NULL,
    name  character varying(64) NOT NULL,
    repop integer,
    CONSTRAINT PK_ZONES_ID PRIMARY KEY (id)
)
    WITH (OIDS = FALSE)
    TABLESPACE pg_default;

CREATE UNIQUE INDEX IX_ZONES_N ON public.zones (n ASC);

ALTER TABLE public.zones
    OWNER to orlov;

-- Table: public.mobs

CREATE SEQUENCE public.mob_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.mobs
(
    id       integer                NOT NULL DEFAULT nextval('mob_id_seq'::regclass),
    zone_id  integer                NOT NULL,
    n        integer,
    descr    character varying(128) NOT NULL,
    alias    character varying(24)  NOT NULL,
    name_ime character varying(48)  NOT NULL,
    name_rod character varying(48),
    name_dat character varying(48),
    name_vin character varying(48),
    name_tvo character varying(48),
    name_pre character varying(48),
    lvl      integer,
    flag     character varying(128),
    CONSTRAINT PK_MOBS_ID PRIMARY KEY (id),
    CONSTRAINT FK_MOBS_ON_ZONES FOREIGN KEY (zone_id)
        REFERENCES public.zones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (OIDS = FALSE)
    TABLESPACE pg_default;

CREATE INDEX IX_MOBS_ZONE_ID ON public.mobs (zone_id ASC);

ALTER SEQUENCE public.mob_id_seq
    OWNER TO orlov;

ALTER TABLE public.mobs
    OWNER to orlov;

-- Table: public.rooms

CREATE SEQUENCE public.room_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.rooms
(
    id      integer               NOT NULL DEFAULT nextval('room_id_seq'::regclass),
    zone_id integer               NOT NULL,
    n       integer,
    descr   character varying(512),
    exits   character varying(10) NOT NULL,
    flag    character varying(128),
    noagr   boolean,
    nomagic boolean,
    title   character varying(48) NOT NULL,

    CONSTRAINT PK_ROOMS_ID PRIMARY KEY (id),
    CONSTRAINT FK_ROOMS_ON_ZONES FOREIGN KEY (zone_id)
        REFERENCES public.zones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (OIDS = FALSE)
    TABLESPACE pg_default;

CREATE INDEX IX_ROOMS_ZONE_ID ON public.rooms (zone_id ASC);

ALTER SEQUENCE public.room_id_seq
    OWNER TO orlov;

ALTER TABLE public.rooms
    OWNER to orlov;

-- Table: public.reagents

CREATE SEQUENCE public.reagent_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.reagents
(
    id      integer               NOT NULL DEFAULT nextval('reagent_id_seq'::regclass),
    name    character varying(32) NOT NULL,
    name2   character varying(32),
    quality character varying(24),
    type    character varying(12) NOT NULL,
    type2   character varying(12),
    CONSTRAINT PK_REAGENTS_ID PRIMARY KEY (id)
)
    WITH (OIDS = FALSE)
    TABLESPACE pg_default;

ALTER SEQUENCE public.reagent_id_seq
    OWNER TO orlov;

ALTER TABLE public.reagents
    OWNER to orlov;
