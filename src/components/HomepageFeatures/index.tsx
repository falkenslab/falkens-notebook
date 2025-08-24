import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {FlaskConical, BookOpen, Cog} from 'lucide-react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};


const FeatureList: FeatureItem[] = [
  {
    title: 'Experimentos y resultados',
    Svg: FlaskConical,
    description: (
      <>
        Un laboratorio para probar ideas y medir su impacto. Descubre
        benchmarks y aprendizajes prácticos en el{' '}
        <Link to="/blog">blog</Link> y en las secciones de{' '}
        <Link to="/docs/tools/benchmarking">benchmarking</Link>.
      </>
    ),
  },
  {
    title: 'Conceptos y guías',
    Svg: BookOpen,
    description: (
      <>
        Contenido claro para ir de cero a productivo: revisa el{' '}
        <Link to="/docs/intro">inicio del cuaderno</Link> y el{' '}
        <Link to="/docs/basic-concepts/glossary">glosario</Link>.
      </>
    ),
  },
  {
    title: 'Herramientas y ecosistema',
    Svg: Cog,
    description: (
      <>
        Piezas para construir:{' '}
        <Link to="/docs/tools/llms">LLMs</Link>,{' '}
        <Link to="/docs/tools/vector-databases">vectores</Link> y más utilidades
        del stack.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
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
