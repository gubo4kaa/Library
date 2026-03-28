type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface Props {
  data: JsonLdValue;
}

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
