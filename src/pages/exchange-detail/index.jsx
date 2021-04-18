import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { message, Descriptions, Button, Tag, List } from 'antd'
import {
  FacebookOutlined,
  RedditOutlined,
  ArrowLeftOutlined,
  TwitterOutlined,
} from '@ant-design/icons'

import { DEFAULT_ERROR_TEXT } from '@/common/constants'
import {
  getTrustScoreColor,
  toThousands,
  getImageCDNUrl,
  toStandardDateStr,
} from '@/common/utils'
import { get } from '@/common/request'
import Loading from '@/components/loading'
import BlankLink from '@/components/blank-link'

import './index.scss'

function ExchangeDetail() {
  const { exchangeId } = useParams()
  const [exchangeInfo, setExchangeInfo] = useState({
    socialMediaLinks: [],
    homePageLinks: [],
  })
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    get(`/exchanges/${exchangeId}`)
      .then((response) => {
        const exchangeInfo = response.data
        const socialMeidas = [
          {
            key: 'facebookUrl',
            icon: <FacebookOutlined />,
            linkHanlder: (link) => link,
          },
          {
            key: 'twitterHandle',
            icon: <TwitterOutlined />,
            linkHanlder: (name) => `https://twitter.com/${name}`,
          },
          {
            key: 'redditUrl',
            icon: <RedditOutlined />,
            linkHanlder: (link) => link,
          },
        ]
        exchangeInfo.socialMediaLinks = socialMeidas
          .map((media) => {
            if (exchangeInfo[media.key]) {
              return {
                ...media,
                link: media.linkHanlder(exchangeInfo[media.key]),
              }
            }
            return media
          })
          .filter((i) => i.link)
        const urlKeys = ['url', 'otherUrl1', 'otherUrl2']
        exchangeInfo.homePageLinks = urlKeys
          .map((key) => exchangeInfo[key])
          .filter(Boolean)
        exchangeInfo.tradeVolume24hBtcStr = toThousands(
          exchangeInfo.tradeVolume24hBtc
        )
        setExchangeInfo(exchangeInfo)
      })
      .catch(({ error }) => message.error(error || DEFAULT_ERROR_TEXT))
      .finally(() => setLoading(false))
  }, [exchangeId])

  return (
    <div className="main__container">
      <div className="exchange-detail__action">
        <Button icon={<ArrowLeftOutlined />} onClick={() => history.push('/')}>
          Back
        </Button>
      </div>
      <Loading show={loading} className="exchange-detail__loading">
        <div>
          <Descriptions
            bordered
            title={
              <div className="exchange-detail__title">
                <div className="exchange-detail__name">
                  <img
                    src={exchangeInfo.image}
                    alt={`${exchangeInfo.name} logo`}
                  />
                  <h2>{exchangeInfo.name}</h2>
                </div>
                <div>
                  <span className="exchange-detail__label">
                    Trade Volume(24h):{' '}
                  </span>
                  <img
                    className="exchange-detail__unit"
                    alt="bitcoin logo"
                    src={getImageCDNUrl('/bitcoin-btc-logo.svg')}
                  />
                  {exchangeInfo.tradeVolume24hBtcStr}
                </div>
              </div>
            }
            column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="EstablishedYear">
              {exchangeInfo.yearEstablished}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {exchangeInfo.country}
            </Descriptions.Item>
            <Descriptions.Item label="TrustScore">
              <Tag color={getTrustScoreColor(exchangeInfo.trustScore)}>
                {exchangeInfo.trustScore}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="HomePage" span={3}>
              {exchangeInfo.homePageLinks.map((link) => (
                <div key={link}>
                  <BlankLink href={link}>{link}</BlankLink>
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="SocialMedia" span={3}>
              {exchangeInfo.socialMediaLinks.map((socialMedia) => (
                <div
                  className="exchange-detail__icon"
                  key={socialMedia.key}
                  onClick={() => window.open(socialMedia.link, '_target')}
                >
                  {socialMedia.icon}
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
          <h2 className="exchange-detail__title">Recent Updates</h2>
          <List
            className="exchange-detail__list"
            dataSource={exchangeInfo.statusUpdates}
            locale={{
              emptyText: 'No Recent Updates',
            }}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <div key="createdAt">
                    {toStandardDateStr(item.createdAt)}
                  </div>,
                ]}
              >
                {item.description}
              </List.Item>
            )}
          />
        </div>
      </Loading>
    </div>
  )
}

export default ExchangeDetail
