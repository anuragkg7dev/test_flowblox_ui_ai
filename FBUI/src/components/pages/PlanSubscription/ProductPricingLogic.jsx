import { getProductBundleSubscription, getProductComboSubscription } from "@/components/client/EdgeFunctionRepository"

export const intervalOption = [
    { label: "Monthly", value: "month" },
    { label: "Yearly", value: "year" },
]

export const currencyOption = [
    { label: "USD", value: "usd" },
    { label: "GBP", value: "gbp" },
]

export function getProductStripeBundleSubscription(callback) {
    return getProductBundleSubscription(callback)
}

export function getProductStripeComboSubscription(productId, callback) {
    return getProductComboSubscription(productId, callback)
}

export const getBundleOptions = (data) => {
    if (data && data.bundlePlans) {
        return data?.bundlePlans?.map(plan => ({
            value: plan.id,
            label: plan.configuration.label
        }))
    }
    return []
}

export const calculateTotalPrice = (bundles, selectedPlan, currency, interval) => {
    let selectedPriceIds = []
    if (!selectedPlan) return 0
    const selectedBundle = bundles.bundlePlans.find(p => p.id === selectedPlan)
    if (!selectedBundle) return 0
   
    const productIds = [
        ...(selectedBundle.base_plan_ids?.plans || []),
        ...(selectedBundle.container_plan_ids?.plans || []),
        ...(selectedBundle.bolt_on_ids?.plans || [])
    ]

    
    let total = 0
    productIds.forEach(productId => {
        const priceRecord = bundles.priceRecords.find(record => record.product_id === productId.id && record.product_version === productId.version)
     
        if (priceRecord) {
            const price = priceRecord.metadata.prices.find(
                p => p.currency === currency && p.interval === interval && p.active
            )
            if (price) {
                total += price.unit_amount
                selectedPriceIds.push(price.id)
            }
        }
    })

    let result = {}
    result["total"] = (Number(total) / 100)
    result["priceIds"] = selectedPriceIds

    return result
}

export const calculateTotalPriceComboProduct = (priceRecord, currency) => {
    // For Single priceRecord
    let price = priceRecord?.metadata?.prices?.filter(item => currency == item.currency)
 
    let total = price?.[0]?.unit_amount
    let selectedPriceId = price?.[0]?.id

    let result = {}
    result["total"] = (Number(total) / 100)
    result["priceIds"] = [selectedPriceId]
    result["currency"] = [currency]


 
    return result
}

export const getFormattedPrice = (currency, totalPrice) => {

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2
    })

    return formattedPrice;

}


export const getSelectedBundle = (bundles, selectedPlan) => {

    if (!selectedPlan) { return {} }

    return bundles.bundlePlans.find(p => p.id === selectedPlan)
}