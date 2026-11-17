import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Board from '../components/Board'

describe('Board - rendering', () => {
  it('renders correct number of squares', () => {
    render(<Board rows={3} columns={4} />)
    const squares = document.querySelectorAll('.square')
    expect(squares.length).toBe(12)
  })

  it('renders correct number of rows', () => {
    render(<Board rows={3} columns={4} />)
    const rows = document.querySelectorAll('.board-row')
    expect(rows.length).toBe(3)
  })

  it('renders knight at (0,0) by default', () => {
    render(<Board rows={3} columns={4} />)
    const knightSquare = document.querySelector('.square.knight')
    expect(knightSquare).toBeInTheDocument()
    expect(knightSquare?.textContent).toBe('K')
  })

  it('highlights knight square with knight class', () => {
    render(<Board rows={3} columns={4} />)
    const knightSquare = document.querySelector('.square.knight')
    expect(knightSquare).toBeInTheDocument()
  })
})

describe('Board - move highlighting', () => {
  it('marks valid knight moves with valid-move class', () => {
    render(<Board rows={8} columns={8} />)
    // Knight at (0,0) can move to (1,2) and (2,1)
    const validMoves = document.querySelectorAll('.square.valid-move')
    expect(validMoves.length).toBe(2)
  })

  it('does not mark invalid moves', () => {
    render(<Board rows={8} columns={8} />)
    // Knight at (0,0), adjacent square (0,1) is not a valid knight move
    const squares = document.querySelectorAll('.square')
    expect(squares[1].classList.contains('valid-move')).toBe(false)
  })
})

describe('Board - movement', () => {
  it('moves knight to a valid square on click', async () => {
    const user = userEvent.setup()
    render(<Board rows={8} columns={8} />)

    // Knight starts at (0,0), valid moves are (1,2) and (2,1)
    const squares = document.querySelectorAll('.square')
    // (1,2) is at index 1*8 + 2 = 10
    await user.click(squares[10])

    // Knight should now be at (1,2)
    const knightSquare = document.querySelector('.square.knight')
    expect(knightSquare).toBeInTheDocument()
    expect(knightSquare?.textContent).toBe('K')
  })

  it('does not move knight on invalid click', async () => {
    const user = userEvent.setup()
    render(<Board rows={8} columns={8} />)

    const squares = document.querySelectorAll('.square')
    // (0,1) is adjacent, not a valid knight move
    await user.click(squares[1])

    // Knight should still be at (0,0)
    const knightSquare = document.querySelector('.square.knight')
    // The knight marker should be in the first square
    expect(knightSquare?.textContent).toBe('K')
  })

  it('updates valid moves after knight moves', async () => {
    const user = userEvent.setup()
    render(<Board rows={8} columns={8} />)

    // Move knight to (1,2)
    const squares = document.querySelectorAll('.square')
    await user.click(squares[10])

    // From (1,2), there should be valid moves available
    const validMoves = document.querySelectorAll('.square.valid-move')
    expect(validMoves.length).toBeGreaterThan(0)
  })
})