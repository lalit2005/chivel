import { default as NextLink, LinkProps } from 'next/link'

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode
}

const Link = ({ href, children, ...props }: CustomLinkProps) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  )
}
