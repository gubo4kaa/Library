import { DetailedHTMLProps, HTMLAttributes } from "react"

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    
  }
  

const Header = ({className}:Props) => {
  return <div className={className}>
        Header
    </div>
}

export default Header