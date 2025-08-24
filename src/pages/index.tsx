import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {BookOpen, Newspaper} from 'lucide-react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.subtitleExtra}>
          Ideas, conceptos y experimentos de IA aplicada para aprender,
          compartir y construir en comunidad.
        </p>
        <div className={clsx(styles.buttons, styles.ctaGroup)}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            <BookOpen className={styles.ctaIcon} size={18} />
            Explorar el Cuaderno
          </Link>
          <Link className={clsx('button button--outline button--lg', styles.ctaSecondary)} to="/blog">
            <Newspaper className={styles.ctaIcon} size={18} />
            Leer el Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Cuaderno de IA aplicada: ideas, experimentos, herramientas y resultados.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
