import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App - dimension input logic', () => {
  it('renders initial board with default 8x8', () => {
    render(<App />)
    const squares = document.querySelectorAll('.square')
    expect(squares.length).toBe(64)
  })

  it('renders the controls', () => {
    render(<App />)
    expect(screen.getByLabelText(/Row/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Column/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Generate Board/i })).toBeInTheDocument()
  })

  it('shows knight marker on starting square', () => {
    render(<App />)
    const knightSquare = document.querySelector('.square.knight')
    expect(knightSquare).toBeInTheDocument()
    expect(knightSquare?.textContent).toBe('K')
  })

  it('accepts valid integer input', async () => {
    const user = userEvent.setup()
    render(<App />)

    const rowInput = screen.getByLabelText(/Row/i)
    await user.clear(rowInput)
    await user.type(rowInput, '5')

    expect(rowInput).toHaveValue('5')
  })

  it('blocks non-numeric input', async () => {
    const user = userEvent.setup()
    render(<App />)

    const rowInput = screen.getByLabelText(/Row/i)
    await user.clear(rowInput)
    await user.type(rowInput, 'abc')

    // handleDimensionChange blocks non-integers
    expect(rowInput).toHaveValue('')
  })

  it('blocks numbers greater than 100', async () => {
    const user = userEvent.setup()
    render(<App />)

    const rowInput = screen.getByLabelText(/Row/i)
    await user.clear(rowInput)
    await user.type(rowInput, '101')

    // After typing '10', it's valid; '101' is blocked, so value stays '10'
    expect(rowInput).toHaveValue('10')
  })

  it('allows empty string', async () => {
    const user = userEvent.setup()
    render(<App />)

    const rowInput = screen.getByLabelText(/Row/i)
    await user.clear(rowInput)
    await user.type(rowInput, '   ')

    // Non-numeric input is blocked, so value stays empty
    expect(rowInput).toHaveValue('')
  })

  it('does not generate board with invalid dimensions', async () => {
    const user = userEvent.setup()
    render(<App />)

    const rowInput = screen.getByLabelText(/Row/i)
    await user.clear(rowInput)
    await user.type(rowInput, '0')

    const generateBtn = screen.getByRole('button', { name: /Generate Board/i })
    await user.click(generateBtn)

    // Board should remain 8x8 (64 squares)
    const squares = document.querySelectorAll('.square')
    expect(squares.length).toBe(64)
  })

  it('generates new board size on valid input', async () => {
    const user = userEvent.setup()
    render(<App />)

    const rowInput = screen.getByLabelText(/Row/i)
    const colInput = screen.getByLabelText(/Column/i)
    const generateBtn = screen.getByRole('button', { name: /Generate Board/i })

    await user.clear(rowInput)
    await user.type(rowInput, '3')
    await user.clear(colInput)
    await user.type(colInput, '4')
    await user.click(generateBtn)

    const squares = document.querySelectorAll('.square')
    expect(squares.length).toBe(12)
  })
})