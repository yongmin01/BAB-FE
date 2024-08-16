import { useState, useEffect } from 'react'
import axios from 'axios'

export const fetchMarker = async () => {
  try {
    const res = await axios.get(`https://babedeuk.shop:8080/v1/stores`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNzIzNTQzMDA4LCJleHAiOjE3MjQ3NTI2MDh9.JTGhQv1e2-VeKAxhRY9YgHNE2Ibv34zfGsXxSjisJgM`,
      },
    })
    console.log(res.data.result)
    return res.data.result
  } catch (error) {
    console.log(error)
  }
}
