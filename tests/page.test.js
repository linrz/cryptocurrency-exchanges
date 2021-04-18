import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import ExchangeList from '../src/pages/exchange-list'
import ExchangeDetail from '../src/pages/exchange-detail'

Enzyme.configure({ adapter: new Adapter() })

const RenderWithRouter = ({ children }) => (
  <MemoryRouter initialEntries={['/detail/binance']}>
    <Route path="/detail/:exchangeId">{children}</Route>
  </MemoryRouter>
)

beforeEach(() => {
  fetchMock.doMock()
})

describe('ExchangeList', () => {
  it('ExchangeList render', () => {
    const exchangeList = mount(<ExchangeList />)
    expect(exchangeList.find('.exchange__list').length).toBe(1)
  })

  it('ExchangeList Detail', () => {
    const exchangeList = mount(
      <RenderWithRouter>
        <ExchangeDetail />
      </RenderWithRouter>
    )
    expect(exchangeList.find('.exchange-detail__action').length).toBe(1)
  })
})
