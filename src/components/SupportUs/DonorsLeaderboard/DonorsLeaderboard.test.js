import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import DonorsLeaderboard from './DonorsLeaderboard'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders in both languages', () => {
  act(() => { render(<DonorsLeaderboard language={0} />, container) })
  expect(container.textContent).toContain('Muro de donantes')
  expect(container.textContent).toContain('Septiembre 2026')
  expect(container.textContent).toContain('Donante anónimo')
  expect(container.querySelectorAll('.donors-podium-card')).toHaveLength(3)
  expect(container.querySelectorAll('.donors-list-row')).toHaveLength(7)
  // top donor first on the podium, total = sum of all 10 mock donors
  expect(container.querySelector('.donors-name').textContent).toEqual('3D Factory')
  expect(container.querySelector('.donors-stat-value').textContent).toContain('159,700')

  act(() => { render(<DonorsLeaderboard language={1} />, container) })
  expect(container.textContent).toContain('Donors wall')
  expect(container.textContent).toContain('September 2026')
  expect(container.textContent).toContain('Anonymous donor')
})
