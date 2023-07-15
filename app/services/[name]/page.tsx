type Props = {
  params: {
    name: string
  }
}

export default function Service({params: {name}}: Props) {
  return <div>Service {name}</div>
}

