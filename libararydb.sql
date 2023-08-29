--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4

-- Started on 2023-08-29 15:35:33 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 842 (class 1247 OID 27213)
-- Name: enum_books_status; Type: TYPE; Schema: public; Owner: libraryuser
--

CREATE TYPE public.enum_books_status AS ENUM (
    'available',
    'borrowed'
);


ALTER TYPE public.enum_books_status OWNER TO libraryuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 27218)
-- Name: books; Type: TABLE; Schema: public; Owner: libraryuser
--

CREATE TABLE public.books (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    user_id integer,
    status public.enum_books_status DEFAULT 'available'::public.enum_books_status NOT NULL,
    score double precision DEFAULT '-1'::double precision NOT NULL,
    borrowed_count integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.books OWNER TO libraryuser;

--
-- TOC entry 217 (class 1259 OID 27230)
-- Name: books_activities; Type: TABLE; Schema: public; Owner: libraryuser
--

CREATE TABLE public.books_activities (
    id integer NOT NULL,
    book_id integer,
    user_id integer,
    user_score integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.books_activities OWNER TO libraryuser;

--
-- TOC entry 216 (class 1259 OID 27229)
-- Name: books_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: libraryuser
--

CREATE SEQUENCE public.books_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_activities_id_seq OWNER TO libraryuser;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 216
-- Name: books_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: libraryuser
--

ALTER SEQUENCE public.books_activities_id_seq OWNED BY public.books_activities.id;


--
-- TOC entry 214 (class 1259 OID 27217)
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: libraryuser
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO libraryuser;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 214
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: libraryuser
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- TOC entry 219 (class 1259 OID 27237)
-- Name: users; Type: TABLE; Schema: public; Owner: libraryuser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO libraryuser;

--
-- TOC entry 218 (class 1259 OID 27236)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: libraryuser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO libraryuser;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: libraryuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3212 (class 2604 OID 27221)
-- Name: books id; Type: DEFAULT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 27233)
-- Name: books_activities id; Type: DEFAULT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.books_activities ALTER COLUMN id SET DEFAULT nextval('public.books_activities_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 27240)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3223 (class 2606 OID 27235)
-- Name: books_activities books_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.books_activities
    ADD CONSTRAINT books_activities_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 27228)
-- Name: books books_name_key; Type: CONSTRAINT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_name_key UNIQUE (name);


--
-- TOC entry 3221 (class 2606 OID 27226)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- TOC entry 3225 (class 2606 OID 27244)
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- TOC entry 3227 (class 2606 OID 27242)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2023-08-29 15:35:33 UTC

--
-- PostgreSQL database dump complete
--

