import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {Lightbulb, FlaskConical, BookOpen} from 'lucide-react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  color: string;
  to: string;
  btnLabel: string;
};


const FeatureList: FeatureItem[] = [
  {
    title: 'Ideas',
    Svg: Lightbulb,
    color: '#d97706',
    to: 'https://github.com/falkenslab/falkens-notebook/issues/new?template=idea.md',
    btnLabel: 'Proponer',
    description: (
      <>
        Intuiciones sin demostrar, preguntas sin responder, conexiones que aún no sabemos
        si tienen sentido. Las ideas se gestionan como{' '}
        <Link to="https://github.com/falkenslab/falkens-notebook/issues">issues en GitHub</Link>.
      </>
    ),
  },
  {
    title: 'Experimentos',
    Svg: FlaskConical,
    color: '#059669',
    to: '/experiments',
    btnLabel: 'Explorar',
    description: (
      <>
        Código y/o comandos ejecutables, con resultados reales e interpretación breve. Sin teoría de más:
        cada experimento va directo al grano y enlaza a las{' '}
        <Link to="/notes/intro">notas</Link> si hay más que explicar.
      </>
    ),
  },
  {
    title: 'Notas',
    Svg: BookOpen,
    color: '#3b82f6',
    to: '/notes/intro',
    btnLabel: 'Leer',
    description: (
      <>
        Documentación de referencia: modelos, herramientas, el{' '}
        <Link to="/notes/glossary">glosario</Link>, etc. La teoría justa
        que da soporte a los experimentos.
      </>
    ),
  },
];

function Feature({title, Svg, description, color, to, btnLabel}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard} style={{'--feature-color': color} as React.CSSProperties}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
        <div className={styles.featureBtnWrapper}>
          <Link className={clsx('button button--md', styles.featureBtn)} to={to}>
            {btnLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
