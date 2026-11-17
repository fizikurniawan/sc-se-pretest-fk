import { describe, it, expect } from 'vitest'
import { isValidKnightMove } from '../knight'
import type { Position } from '../../types/chess'

describe('isValidKnightMove', () => {
  const board = { rows: 8, columns: 8 }
  const from: Position = { row: 4, col: 4 }

  describe('valid knight moves', () => {
    it('accepts all 8 L-shaped moves from center', () => {
      const validMoves: Position[] = [
        { row: 2, col: 3 },
        { row: 2, col: 5 },
        { row: 3, col: 2 },
        { row: 3, col: 6 },
        { row: 5, col: 2 },
        { row: 5, col: 6 },
        { row: 6, col: 3 },
        { row: 6, col: 5 },
      ]

      validMoves.forEach((to) => {
        expect(isValidKnightMove(from, to, board.rows, board.columns)).toBe(true)
      })
    })

    it('accepts moves from corner (0,0)', () => {
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: 1, col: 2 }, board.rows, board.columns)).toBe(true)
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: 2, col: 1 }, board.rows, board.columns)).toBe(true)
    })
  })

  describe('invalid moves - not knight pattern', () => {
    it('rejects adjacent squares', () => {
      expect(isValidKnightMove(from, { row: 4, col: 5 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove(from, { row: 5, col: 4 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove(from, { row: 3, col: 4 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove(from, { row: 4, col: 3 }, board.rows, board.columns)).toBe(false)
    })

    it('rejects diagonal squares', () => {
      expect(isValidKnightMove(from, { row: 5, col: 5 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove(from, { row: 3, col: 3 }, board.rows, board.columns)).toBe(false)
    })

    it('rejects same square', () => {
      expect(isValidKnightMove(from, { row: 4, col: 4 }, board.rows, board.columns)).toBe(false)
    })

    it('rejects two-square straight moves', () => {
      expect(isValidKnightMove(from, { row: 2, col: 4 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove(from, { row: 4, col: 2 }, board.rows, board.columns)).toBe(false)
    })

    it('rejects 3-1 moves (not knight)', () => {
      expect(isValidKnightMove(from, { row: 1, col: 4 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove(from, { row: 4, col: 1 }, board.rows, board.columns)).toBe(false)
    })
  })

  describe('out of bounds', () => {
    it('rejects moves that are knight-shaped but off board', () => {
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: -1, col: -2 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: -2, col: -1 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove({ row: 7, col: 7 }, { row: 8, col: 9 }, board.rows, board.columns)).toBe(false)
      expect(isValidKnightMove({ row: 7, col: 7 }, { row: 9, col: 8 }, board.rows, board.columns)).toBe(false)
    })

    it('rejects moves on a 1x1 board', () => {
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: 1, col: 2 }, 1, 1)).toBe(false)
    })

    it('allows valid moves on small board when within bounds', () => {
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: 1, col: 2 }, 2, 3)).toBe(true)
    })

    it('rejects valid knight pattern on small board when out of bounds', () => {
      expect(isValidKnightMove({ row: 0, col: 0 }, { row: 1, col: 2 }, 2, 2)).toBe(false)
    })
  })
})