type ListItem = {
  heading: string;
  body: string;
};

type InfoGridProps = {
  title: string;
  items: ListItem[];
};

type InfoGridListProps = {
  items: ListItem[];
};

type InfoGridListItemProps = {
  item: ListItem;
  index: number;
};

const InfoGrid = ({ title, items }: InfoGridProps) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <InfoGridList items={items} />
    </div>
  );
};

const InfoGridList = ({ items }: InfoGridListProps) => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-8">
      {items.map((item, index) => (
        <InfoGridListItem key={index} item={item} index={index} />
      ))}
    </ul>
  );
};

const InfoGridListItem = ({ item, index }: InfoGridListItemProps) => {
  return (
    <li
      style={{ animationDelay: `${index * 100}ms` }}
      className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-8 animate-fadein opacity-0"
    >
      <div className="grid">
        <h3 className="text-xl font-bold tracking-tight">{item.heading}</h3>
        <p className="opacity-50 text-base leading-none">{item.body}</p>
      </div>
    </li>
  );
};

export default InfoGrid;
