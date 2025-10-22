import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

function Page() {
  return <h1>Hello World</h1>
}

describe('Page', () => {
  it('renders the heading', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { name: /hello world/i })
    expect(heading).toBeInTheDocument()
  })
})