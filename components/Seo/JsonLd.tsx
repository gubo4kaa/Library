type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

interface Props {
  data: JsonLdValue;
}

export default function JsonLd({ data }: Props) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
