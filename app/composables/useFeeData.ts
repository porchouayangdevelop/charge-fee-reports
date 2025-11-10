export interface FeeData {
  category: string;
  amount: number;
  count: number;
  color?: string
}

export interface MonthlyFeeData {
  month: string;
  smsFee: number;
  atmFee: number;
  upiFee: number;
  visaFee: number;
}

export const useFeeData = () => {
  const monthlyData = ref<MonthlyFeeData[]>([
    {
      month: 'January 2025',
      smsFee: 45000000,
      atmFee: 199913044,
      upiFee: 67000000,
      visaFee: 89000000
    },
    {
      month: 'February 2025',
      smsFee: 52000000,
      atmFee: 215000000,
      upiFee: 72000000,
      visaFee: 95000000
    },
    {
      month: 'March 2025',
      smsFee: 48000000,
      atmFee: 207000000,
      upiFee: 69000000,
      visaFee: 91000000
    }]
  );

  const getCurrentMonthData = computed(() => {
    const current = monthlyData.value[monthlyData.value.length - 1];
    return {
      smsFee: current!.smsFee,
      atmFee: current!.atmFee,
      upiFee: current!.upiFee,
      visaFee: current!.visaFee,
      total: current!.smsFee + current!.atmFee + current!.upiFee + current!.visaFee
    }
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LAK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getPieChartsData = computed(() => {
    const current = getCurrentMonthData.value;
    return {
      series: [current.smsFee, current.atmFee, current.upiFee, current.visaFee],
      labels: ['SMS Fee', 'ATM Fee', 'UPI Fee', 'VISA Fee'],
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    }
  })

  const getTrendData = computed(() => {
    return {
      categories: monthlyData.value.map((d) => d.month),
      series: [
        {
          name: 'SMS Fee',
          data: monthlyData.value.map((s) => s.smsFee),
        },
        {
          name: 'ATM Fee',
          data: monthlyData.value.map((a) => a.atmFee),
        },
        {
          name: 'UPI Fee',
          data: monthlyData.value.map((u) => u.upiFee),
        },
        {
          name: 'VISA Fee',
          data: monthlyData.value.map((v) => v.visaFee),
        }
      ]
    }
  })

  return {
    monthlyData,
    getTrendData,
    getCurrentMonthData,
    getPieChartsData,
    formatCurrency,
    formatNumber
  }
}
