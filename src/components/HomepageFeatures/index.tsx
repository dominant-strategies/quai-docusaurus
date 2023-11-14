import Card, { type CardItem } from '../Card/Card';

const FeatureList: CardItem[] = [
  {
    title: 'Introduction to Quai',
    link: '/docs/learn/intro/',
    description: <>Learn the basics of how Quai Network scales infinitely.</>,
  },
  {
    title: 'Use Quai',
    link: '/docs/category/use-quai/',
    description: <>Explore wallets, block explorers, and Testnet faucets.</>,
  },
  {
    title: 'Academic Resources',
    link: '/docs/category/academic-resources/',
    description: <>Read the research papers that detail the new technologies introduced by Quai.</>,
  },
];

const DocList: CardItem[] = [
  {
    title: 'Run A Node',
    link: '/docs/category/run-a-node/',
    description: <>Become an active participant in the network to interact with Quai trustlessly.</>,
  },
  {
    title: 'Become A Miner',
    link: '/docs/category/run-a-miner/',
    description: <>Start mining Quai's ASIC-resistant algorithm to contribute to network security.</>,
  },
  {
    title: 'Develop on Quai',
    link: '/docs/category/tutorials/',
    description: <>Build decentralized applications that aren't bottle-necked by Layer-1 scalability.</>,
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section className="container margin-top--lg margin-bottom--lg">
        <h2></h2>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Card key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section className="container margin-top--lg margin-bottom--lg">
        <div className="container">
          <div className="row">
            {DocList.map((props, idx) => (
              <Card key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
