import { UrlCalcula } from "../../Constants"

const CalculateService = {
  getInvestment: async (data) => {
    try {
      const res = await fetch(UrlCalcula, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(async res => {
        const data = await res.json()
        return { status: res.status, data }
      })
      return res
    } catch (e) {
      console.log("error", e)
      return { status: 500, data: { Causa: "Error en servidor", Error: "Contacte a su administrador" } }
    }
  }
}

export default CalculateService