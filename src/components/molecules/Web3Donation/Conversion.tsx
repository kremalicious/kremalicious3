import React, { useState, useEffect, ReactElement } from 'react'
import fetch from 'node-fetch'
import { conversion as styleConversion } from './Conversion.module.css'

export async function getFiat(
  amount: number
): Promise<{ [key: string]: string }> {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur%2Cusd'
  const response = await fetch(url)

  if (!response.ok) console.error(response.statusText)
  const data = await response.json()
  const { usd, eur } = data.ethereum
  const dollar = (amount * usd).toFixed(2)
  const euro = (amount * eur).toFixed(2)

  return { dollar, euro }
}

export default function Conversion({
  amount
}: {
  amount: string
}): ReactElement {
  const [conversion, setConversion] = useState({
    euro: '0.00',
    dollar: '0.00'
  })
  const { dollar, euro } = conversion

  async function getFiatResponse() {
    try {
      const { dollar, euro } = await getFiat(Number(amount))
      setConversion({ euro, dollar })
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getFiatResponse()
  }, [amount])

  return (
    <div className={styleConversion}>
      <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
      <span>{euro !== '0.00' && `= € ${euro}`}</span>
    </div>
  )
}
