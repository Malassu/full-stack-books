import { render, screen } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
import BookForm from './BookForm'

describe('Component Testing', () => {
  it('Renders title correctly', () => {
    render(<App />)
    const tableTitle = screen.getByText("My Books")
    expect(tableTitle).toBeInTheDocument()
  })
  it('Renders form buttons correctly', () => {
    render(<BookForm />)
    const save = screen.getByText("Save")
    const saveNew = screen.getByText("Save New")
    const deleteButton = screen.getByText("Delete")
    expect(save).toBeInTheDocument()
    expect(saveNew).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  })
})