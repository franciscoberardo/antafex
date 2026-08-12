import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Bot,
    Code2,
    Database,
    ShoppingCart,
    Cloud,
    ShieldCheck,
    Menu,
    X,
    Mail,
    Phone,
    MapPin,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import pb from '@/lib/pocketbaseClient';

const NAV = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Casos de éxito', href: '#portafolio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
];

const SERVICES = [
    {
        icon: Code2,
        title: 'Software a medida',
        text: 'Automatizamos procesos manuales y creamos plataformas que su equipo usa a diario. Menos errores, menos tiempo perdido y operaciones que escalan sin contratar más gente.',
        tags: ['Procesos', 'Automatización', 'Productividad'],
    },
    {
        icon: Database,
        title: 'Decisiones con datos',
        text: 'Convertimos información dispersa en tableros claros para decidir con seguridad. Su equipo ve el negocio en tiempo real y actúa antes que la competencia.',
        tags: ['Tableros', 'Reportes', 'Visión'],
    },
    {
        icon: Bot,
        title: 'Agentes de IA',
        text: 'Asistentes que responden clientes, clasifican solicitudes y ejecutan tareas repetitivas. Su equipo se enfoca en lo importante y atiende más con los mismos recursos.',
        tags: ['Atención', 'Eficiencia', 'Automatización'],
    },
    {
        icon: ShoppingCart,
        title: 'Vender en línea',
        text: 'Tiendas y canales B2B que funcionan solos: pedidos, pagos y stock sincronizado. Más ventas, menos fricción y un canal que crece mientras usted duerme.',
        tags: ['Ventas', 'Canales', 'Crecimiento'],
    },
    {
        icon: Cloud,
        title: 'Operación confiable',
        text: 'Sistemas que no se caen y crecen con su negocio. Menos incidentes, menos costos ocultos y la tranquilidad de operar sin sorpresas.',
        tags: ['Estabilidad', 'Escalabilidad', 'Ahorro'],
    },
    {
        icon: ShieldCheck,
        title: 'Negocio protegido',
        text: 'Resguardamos su información y la de sus clientes con estándares corporativos. Cumplimiento, control y la tranquilidad de operar sin riesgos.',
        tags: ['Confianza', 'Cumplimiento', 'Continuidad'],
    },
];

const CASES = [
    {
        image: '/venttium.jpg',
        sector: 'Software · Gestión',
        title: 'Todo tu negocio en un solo lugar',
        text: 'Gestioná clientes, pedidos, productos, stock, cobros y operaciones desde una sola plataforma, potenciada con IA.',
        metric: 'Venttium',
        metricLabel: 'Tu negocio conectado',
    },
    {
        image: 'https://images.hostinger.com/fd5b9929-1cdf-43d0-8a32-e1428fab3fae.png',
        sector: 'Distribución · E-commerce',
        title: 'Canal B2B con integración ERP en tiempo real',
        text: 'Creamos tiendas y plataformas de e-commerce conectadas con tu negocio, con precios personalizados, stock, pedidos y pagos online.',
        metric: '3,1x',
        metricLabel: 'crecimiento en pedidos digitales',
    },
    {
        image: 'https://images.hostinger.com/81369dc5-b1af-42c3-837f-8a51a0b84206.png',
        sector: 'Inteligencia Artificial',
        title: 'Agentes de IA que trabajan sobre tus procesos',
        text: 'Diseñamos agentes conectados a tus datos, sistemas y herramientas para automatizar tareas, responder consultas y asistir a tus equipos.',
        metric: 'AI',
        metricLabel: 'Engineering',
    },
    {
        image: 'https://images.hostinger.com/f3d4f5f3-bb1c-4990-ac98-b81451daf3a3.png',
        sector: 'Software a medida',
        title: 'Apps, sitios y plataformas para hacer crecer tu negocio',
        text: 'Desarrollamos sitios web, aplicaciones y e-commerce a medida, integrados con las herramientas que ya utiliza tu empresa.',
        metric: 'A medida',
        metricLabel: 'para tu negocio',
    },
];

/*
const CASES = [
    {
        image: 'https://images.hostinger.com/f3d4f5f3-bb1c-4990-ac98-b81451daf3a3.png',
        sector: 'Retail · Datos',
        title: 'Un centro de datos único para toda la operación',
        text: 'Consolidamos inventario, ventas y logística en un warehouse con tableros diarios. El cierre mensual pasó de 9 días a 6 horas.',
        metric: '87%',
        metricLabel: 'menos tiempo en reportería',
    },
    {
        image: 'https://images.hostinger.com/81369dc5-b1af-42c3-837f-8a51a0b84206.png',
        sector: 'Servicios financieros · IA',
        title: 'Agente de IA para atención y onboarding',
        text: 'Un agente conectado a la base documental resuelve consultas de primer nivel y escala a un asesor con contexto completo.',
        metric: '64%',
        metricLabel: 'de tickets resueltos sin agente',
    },
    {
        image: 'https://images.hostinger.com/fd5b9929-1cdf-43d0-8a32-e1428fab3fae.png',
        sector: 'Distribución · E-commerce',
        title: 'Canal B2B con integración ERP en tiempo real',
        text: 'Portal de pedidos mayoristas con precios por cliente, stock sincronizado y pagos en línea para 1.300 compradores activos.',
        metric: '3,1x',
        metricLabel: 'crecimiento en pedidos digitales',
    },
]; */

const STEPS = [
    { n: '01', t: 'Diagnóstico', d: 'Dos semanas para entender procesos, datos y prioridades reales del negocio.' },
    { n: '02', t: 'Arquitectura', d: 'Definimos alcance, stack y métricas de éxito antes de escribir la primera línea.' },
    { n: '03', t: 'Construcción', d: 'Sprints de dos semanas con demo, ambiente de pruebas y avance visible.' },
    { n: '04', t: 'Operación', d: 'Monitoreo, soporte y evolución continua con acuerdos de servicio claros.' },
];

const MARQUEE = [
    'Desarrollo a medida',
    'Data engineering',
    'Agentes de IA',
    'E-commerce B2B',
    'Integraciones ERP',
    'Cloud & DevOps',
    'Automatización',
];

const SERVICE_OPTIONS = [
    { value: 'software', label: 'Desarrollo de software' },
    { value: 'datos', label: 'Manejo de datos / BI' },
    { value: 'agentes-ia', label: 'Agentes de IA' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'cloud', label: 'Cloud e infraestructura' },
    { value: 'otro', label: 'Otro' },
];

const CONTACT_NOTIFICATION_ENDPOINT = 'https://formsubmit.co/ajax/antafex@gmail.com';

const inputClass =
    'w-full rounded-md border border-border bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/70 focus:ring-2 focus:ring-primary/25';

const smoothScrollTo = (href) => {
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;
    const headerOffset = 64;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
};

const NavItem = ({ item, onNavigate }) => (
    <motion.a
        href={item.href}
        onClick={(e) => {
            e.preventDefault();
            smoothScrollTo(item.href);
            if (onNavigate) onNavigate();
        }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="text-base text-muted-foreground transition-colors hover:text-foreground"
    >
        {item.label}
    </motion.a>
);

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-8">
               <a href="#top" className="flex items-center">
                <img
                    src="/logo.png"
                    alt="Antafex"
                    className="h-16 w-auto sm:h-40"
                />
                </a>
                <nav className="hidden items-center gap-8 md:flex">
                    {NAV.map((item) => (
                        <NavItem key={item.href} item={item} />
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <a
                        href="#contacto"
                        onClick={(e) => { e.preventDefault(); smoothScrollTo('#contacto'); }}
                        className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-base font-semibold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98] sm:inline-flex"
                    >
                        Agendar diagnóstico
                    </a>
                    <button
                        type="button"
                        aria-label="Abrir menú"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground md:hidden"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {open && (
                <div className="border-t border-white/5 bg-background px-4 pb-5 pt-2 md:hidden">
                    {NAV.map((item) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo(item.href);
                                setOpen(false);
                            }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="block border-b border-white/5 py-4 text-lg text-muted-foreground"
                        >
                            {item.label}
                        </motion.a>
                    ))}
                    <a
                        href="#contacto"
                        onClick={(e) => { e.preventDefault(); smoothScrollTo('#contacto'); setOpen(false); }}
                        className="mt-4 block rounded-md bg-primary px-4 py-3.5 text-center text-base font-semibold text-primary-foreground"
                    >
                        Agendar diagnóstico
                    </a>
                </div>
            )}
        </header>
    );
};

const Hero = () => (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
        <img
            src="https://images.hostinger.com/94216ce2-6e4b-4433-a892-2dc085f641f4.png"
            alt="Corredor de centro de datos iluminado en azul"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background via-background/85 to-background/40" />
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.25]" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/20 blur-[90px] animate-aurora sm:-left-32 sm:h-[28rem] sm:w-[28rem] sm:blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-primary/10 blur-[90px] animate-aurora sm:-right-24 sm:h-[22rem] sm:w-[22rem] sm:blur-[110px]" style={{ animationDelay: '4s' }} />
        <div className="relative mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-8 sm:py-24">
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-primary animate-float-soft sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
                Software · Datos · IA
            </motion.p>
            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
                className="mt-7 max-w-4xl text-balance font-display text-[2.05rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
                Desarrollamos tecnología personalizada para impulsar la
                <span className="relative mx-1 inline-block sm:mx-2">
                    <span className="relative z-10 text-primary">eficiencia</span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                        className="absolute inset-x-0 bottom-1 z-0 h-3 origin-left -rotate-1 bg-primary/25"
                    />
                </span>
                , la
                <span className="relative mx-1 inline-block sm:mx-2">
                    <span className="relative z-10 text-primary">innovación</span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
                        className="absolute inset-x-0 bottom-1 z-0 h-3 origin-left -rotate-1 bg-primary/25"
                    />
                </span>
                y el
                <span className="relative mx-1 inline-block sm:mx-2">
                    <span className="relative z-10 text-primary">crecimiento</span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
                        className="absolute inset-x-0 bottom-1 z-0 h-3 origin-left -rotate-1 bg-primary/25"
                    />
                </span>
                de tu negocio.
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
                className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
                Convertimos procesos manuales en sistemas automáticos, datos dispersos en decisiones claras
                y oportunidades en nuevos canales de ingreso. Tecnología que trabaja para que su negocio
                crezca más rápido y con menos esfuerzo.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
                <a
                    href="#contacto"
                    onClick={(e) => { e.preventDefault(); smoothScrollTo('#contacto'); }}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98] sm:w-auto sm:px-7"
                >
                    Hablemos de su proyecto <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                    href="#portafolio"
                    onClick={(e) => { e.preventDefault(); smoothScrollTo('#portafolio'); }}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md border border-border px-5 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary active:scale-[0.98] sm:w-auto sm:px-7"
                >
                    Ver casos de éxito
                </a>
            </motion.div>


        </div>
    </section>
);

const Marquee = () => (
    <div className="overflow-hidden border-y border-white/10 bg-secondary/40 py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
            {[0, 1].map((group) => (
                <div key={group} aria-hidden={group === 1} className="flex shrink-0 gap-10 pr-10">
                    {MARQUEE.map((item) => (
                        <span
                            key={`${item}-${group}`}
                            className="flex items-center gap-10 text-sm uppercase tracking-[0.2em] text-muted-foreground"
                        >
                            {item}
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

const Services = () => (
    <section id="servicios" className="mx-auto w-full max-w-[80rem] px-4 py-20 sm:px-8 sm:py-32">
        <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Servicios</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Soluciones tecnológicas que mueven su negocio hacia adelante
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Cada solución está pensada para resolver un problema real de su operación y generar un
                retorno medible. No vendemos tecnología: entregamos resultados.
            </p>
        </Reveal>
        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                    <article className="group grid min-w-0 gap-6 py-9 transition-all duration-300 hover:bg-white/[0.03] md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)] md:items-start md:gap-10 md:px-4 md:hover:pl-6">
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: -4 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                            className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary"
                        >
                            <s.icon className="h-5 w-5" strokeWidth={1.75} />
                        </motion.div>
                        <div>
                            <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{s.title}</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {s.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{s.text}</p>
                    </article>
                </Reveal>
            ))}
        </div>
    </section>
);

const Portfolio = () => (
    <section id="portafolio" className="border-y border-white/10 bg-secondary/25 py-20 sm:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-8">
            <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Portafolio</p>
                <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                    Resultados medibles
                </h2>
            </Reveal>
            <div className="mt-14 space-y-6">
                {CASES.map((c, i) => (
                    <Reveal key={c.title} delay={i * 0.06}>
                        <motion.article
                            whileHover={{ y: -6 }}
                            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                            className={`grid overflow-hidden rounded-xl border border-white/10 bg-card glow-ring lg:grid-cols-2 ${
                                i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                            }`}
                        >
                            <figure className="relative min-h-[240px] lg:min-h-[320px]">
                                <img
                                    src={c.image}
                                    alt={c.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                            </figure>
                            <div className="flex min-w-0 flex-col justify-center gap-5 p-5 sm:p-10">
                                <p className="text-xs uppercase tracking-[0.18em] text-primary">{c.sector}</p>
                                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                                    {c.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{c.text}</p>
                                <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-baseline sm:gap-4">
                                    <span className="font-display text-4xl font-bold text-primary">{c.metric}</span>
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {c.metricLabel}
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

const About = () => (
    <section id="nosotros" className="mx-auto w-full max-w-[80rem] px-4 py-20 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <Reveal>
                <div className="relative">
                    <img
                        src="https://images.hostinger.com/80e23121-99d1-4e7d-82ae-e9fe814c5476.png"
                        alt="Equipo de ingeniería de Antafex trabajando"
                        className="w-full rounded-xl border border-white/10 object-cover"
                    />

                </div>
            </Reveal>
            <div>
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sobre Antafex</p>
                    <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                        Ingeniería seria, comunicación clara y equipos que se quedan
                    </h2>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Trabajamos con áreas de tecnología, operaciones y dirección para llevar iniciativas
                        digitales desde la idea hasta la operación diaria. Cada proyecto tiene un líder técnico
                        responsable, documentación viva y un plan de traspaso: si mañana quiere continuar con su
                        equipo interno, podrá hacerlo.
                    </p>
                </Reveal>
                <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
                    {STEPS.map((s, i) => (
                        <Reveal key={s.n} delay={i * 0.05}>
                            <div className="h-full bg-card p-6">
                                <span className="font-display text-xs font-bold tracking-widest text-primary">
                                    {s.n}
                                </span>
                                <h3 className="mt-3 font-display text-base font-semibold">{s.t}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: 'software',
        message: '',
    });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');
        try {
            const selectedService = SERVICE_OPTIONS.find((option) => option.value === form.service);
            const notification = {
                _subject: `Nueva solicitud de ${form.name} - Antafex`,
                _template: 'table',
                _replyto: form.email,
                nombre: form.name,
                correo: form.email,
                empresa: form.company || 'No informado',
                telefono: form.phone || 'No informado',
                servicio: selectedService?.label ?? form.service,
                mensaje: form.message,
            };

            const emailResponse = await fetch(CONTACT_NOTIFICATION_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(notification),
            });
            const emailResult = await emailResponse.json().catch(() => null);

            if (!emailResponse.ok || emailResult?.success === 'false' || emailResult?.success === false) {
                throw new Error(emailResult?.message || 'No se pudo enviar la notificación por correo.');
            }

            // El correo es la acción principal. No impedimos que el usuario reciba la confirmación
            // si el registro auxiliar de PocketBase está temporalmente indisponible.
            pb.collection('contact_requests').create(form).catch(() => undefined);
            setStatus('done');
            setForm({ name: '', email: '', company: '', phone: '', service: 'software', message: '' });
        } catch (err) {
            setStatus('idle');
            setError(err.message || 'No pudimos enviar su mensaje. Intente de nuevo o escríbanos a antafex@gmail.com.');
        }
    };

    return (
        <section id="contacto" className="border-t border-white/10 bg-secondary/25 py-24 sm:py-32">
            <div className="mx-auto grid w-full max-w-[80rem] gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contacto</p>
                    <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                        Cuéntenos qué necesita construir
                    </h2>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Respondemos en menos de 24 horas hábiles con una propuesta de diagnóstico sin costo y
                        una estimación honesta de tiempos.
                    </p>
                    <ul className="mt-10 space-y-5 text-sm">
                        <li className="flex min-w-0 items-center gap-4">
                            <Mail className="h-5 w-5 text-primary" strokeWidth={1.75} />
                            <span className="min-w-0 break-words text-muted-foreground">antafex@gmail.com</span>
                        </li>
                        <li className="flex min-w-0 items-center gap-4">
                            <Phone className="h-5 w-5 text-primary" strokeWidth={1.75} />
                            <span className="text-muted-foreground">+54 342 5 918 850</span>
                        </li>
                        <li className="flex min-w-0 items-center gap-4">
                            <MapPin className="h-5 w-5 text-primary" strokeWidth={1.75} />
                            <span className="text-muted-foreground">Atendemos en todo el mundo</span>
                        </li>
                    </ul>
                </div>

                <div className="min-w-0 rounded-xl border border-white/10 bg-card p-5 sm:p-9 glow-ring">
                    {status === 'done' ? (
                        <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                            <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={1.5} />
                            <h3 className="mt-5 font-display text-2xl font-semibold">Mensaje recibido</h3>
                            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                                Gracias por escribirnos. Un líder técnico revisará su caso y le contactará en
                                menos de 24 horas hábiles.
                            </p>
                            <button
                                type="button"
                                onClick={() => setStatus('idle')}
                                className="mt-7 min-h-[44px] rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary"
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Nombre
                                    </label>
                                    <input id="name" required value={form.name} onChange={update('name')} className={inputClass} placeholder="María Restrepo" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Correo corporativo
                                    </label>
                                    <input id="email" type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="maria@empresa.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Empresa
                                    </label>
                                    <input id="company" value={form.company} onChange={update('company')} className={inputClass} placeholder="Nombre de la empresa" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Teléfono
                                    </label>
                                    <input id="phone" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="Opcional" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="service" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    ¿Qué necesita?
                                </label>
                                <select id="service" value={form.service} onChange={update('service')} className={inputClass}>
                                    {SERVICE_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value} className="bg-background">
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Cuéntenos el contexto
                                </label>
                                <textarea id="message" required rows={5} value={form.message} onChange={update('message')} className={inputClass} placeholder="Objetivo, sistemas actuales, plazos estimados..." />
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" /> Enviando
                                    </>
                                ) : (
                                    <>
                                        Enviar solicitud <ArrowUpRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="border-t border-white/10 bg-background py-12">
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-8 px-4 sm:px-8 md:flex-row md:items-start md:justify-between">
            <div>
                <p className="font-display text-lg font-bold">
                    ANTAFEX<span className="text-primary">.</span>
                </p>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                    Software, datos e inteligencia artificial para empresas que necesitan resultados operativos.
                </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
                {NAV.map((item) => (
                    <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); smoothScrollTo(item.href); }} className="text-sm text-muted-foreground hover:text-foreground">
                        {item.label}
                    </a>
                ))}
            </div>
            <div className="text-sm text-muted-foreground">
                <p>antafex@gmail.com</p>
                <p className="mt-2">+54 342 5 918 850</p>
                <p className="mt-4 text-xs">© {new Date().getFullYear()} Antafex. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
);

const HomePage = () => (
    <div className="min-h-screen bg-background text-foreground">
        <Helmet>
            <title>Antafex | Desarrollo de software, datos y agentes de IA para empresas</title>
            <meta
                name="description"
                content="Antafex construye software a medida, plataformas de datos, agentes de IA y e-commerce B2B. Ingeniería confiable para empresas en Latinoamérica y España."
            />
        </Helmet>
        <Seo
            title="Antafex | Software, datos y agentes de IA"
            description="Desarrollo de software a medida, ingeniería de datos, agentes de IA y e-commerce B2B."
            siteName="Antafex"
            image="https://images.hostinger.com/94216ce2-6e4b-4433-a892-2dc085f641f4.png"
        />
        <Header />
        <main>
            <Hero />
            <Marquee />
            <Services />
            <Portfolio />
            <About />
            <Contact />
        </main>
        <Footer />
    </div>
);

export default HomePage;
