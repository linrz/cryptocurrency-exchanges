import { message, Table, Tag, Tooltip } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { get } from '@/common/request'
import BlankLink from '@/components/blank-link'
import { toThousands, getImageCDNUrl, getTrustScoreColor } from '@/common/utils'
import {
  DEFAULT_ERROR_TEXT,
  DEFAULT_PAGE_SIZE,
  BLOG_BASE_URL,
} from '@/common/constants'

import ExchangeNameCell from './components/exchange-name-cell'
import './index.scss'

const columns = [
  {
    title: '#',
    dataIndex: 'trustScoreRank',
    key: 'trustScoreRank',
    fixed: true,
    width: '10%',
    sorter: (prev, next) => prev.trustScoreRank - next.trustScoreRank,
  },
  {
    title: 'Name',
    key: 'name',
    width: '25%',
    render: ({ name, image, url }) => (
      <ExchangeNameCell name={name} image={image} url={url} />
    ),
  },
  {
    title: (
      <div className="exchange-list__score">
        TrustScore &nbsp;
        <Tooltip
          title={
            <div>
              <span>TrustScore explained in here: </span>
              <BlankLink href={`${BLOG_BASE_URL}/trust-score-explained/`}>
                {`${BLOG_BASE_URL}/trust-score-explained/`}
              </BlankLink>
            </div>
          }
        >
          <QuestionCircleOutlined className="exchange-list__icon" />
        </Tooltip>
      </div>
    ),
    key: 'trustScore',
    align: 'right',
    width: '10%',
    render: ({ trustScore }) => (
      <Tag color={getTrustScoreColor(trustScore)}>{trustScore}</Tag>
    ),
  },
  {
    title: (
      <div>
        <img
          className="exchange-list__unit"
          alt="bitcoin logo"
          src={getImageCDNUrl('/bitcoin-btc-logo.svg')}
        />
        <span> Volume(24h)</span>
      </div>
    ),
    key: 'tradeVolume24hBtcStr',
    dataIndex: 'tradeVolume24hBtcStr',
    align: 'right',
    width: '25%',
    sorter: (prev, next) => prev.tradeVolume24hBtc - next.tradeVolume24hBtc,
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    width: '15%',
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right',
    render: ({ id }) => <Link to={`/detail/${id}`}>detail</Link>,
  },
]

function ExchangesList() {
  const [exchangesList, setExchangesList] = useState([])
  const [pagination, setPagination] = useState({ page: 1, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExchangesList(1)
  }, [])

  const getExchangesList = (page) => {
    setLoading(true)
    get('/exchanges', { page, perPage: 10 })
      .then((response) => {
        setExchangesList(
          response.data.map((i) => ({
            ...i,
            tradeVolume24hBtcStr: toThousands(i.tradeVolume24hBtc),
          }))
        )
        setPagination({ page, total: response.headers.total })
      })
      .catch(({ error }) => message.error(error || DEFAULT_ERROR_TEXT))
      .finally(() => setLoading(false))
  }

  const onTableChange = (pagination) => {
    getExchangesList(pagination.current)
  }

  return (
    <div className="main__container exchange__list">
      <Table
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 'max-content',
        }}
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={exchangesList}
        pagination={{
          showSizeChanger: false,
          pageSize: DEFAULT_PAGE_SIZE,
          current: pagination.page,
          total: pagination.total,
        }}
        onChange={onTableChange}
      />
    </div>
  )
}

export default ExchangesList
