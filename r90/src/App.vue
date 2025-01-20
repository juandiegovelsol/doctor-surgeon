<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Region</th>
          <th>Average Sale Price</th>
          <th>Number of Sales</th>
          <th>Avg Days Market</th>
          <th>Months of Inventory</th>
          <th>Avg Condo Sale Price</th>
          <th>Condo Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="regionData in regionDataList"
          :key="regionData.name"
          :class="{ selected: selectedRegion === regionData }"
          @click="selectRegion(regionData)"
        >
          <td>{{ regionData.name }}</td>
          <td>{{ formatPrice(regionData.average_sale_price) }}</td>
          <td>{{ regionData.number_of_sales }}</td>
          <td>{{ regionData.avg_days_market }}</td>
          <td>{{ regionData.months_of_inventory }}</td>
          <td>{{ formatPrice(regionData.condos?.average_condo_sale_price) }}</td>
          <td>{{ regionData.condos?.condo_sales }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedRegion" class="mortgage-calculator">
      <h3>Mortgage Payment Estimator - {{ selectedRegion.name }}</h3>
      <div class="form-group">
        <label for="mortgageAmount">Mortgage Amount (CAD)</label>
        <input
          type="text"
          id="mortgageAmount"
          v-model="mortgageAmountInput"
          readonly
        />
      </div>

      <div class="form-group">
        <label for="amortization">Amortization Period (Years)</label>
        <input
          type="number"
          id="amortization"
          v-model.number="amortizationPeriod"
          min="0"
          max="59"
        />
      </div>

      <div class="form-group">
        <label for="paymentFrequency">Payment Frequency</label>
        <select id="paymentFrequency" v-model="paymentFrequency">
          <option value="monthly">Monthly</option>
          <option value="semi-monthly">Semi-Monthly</option>
        </select>
      </div>

      <div class="form-group">
        <label for="interestRate">Interest Rate (%)</label>
        <input type="text" id="interestRate" v-model="interestRateInput" readonly />
      </div>

      <div class="form-group">
        <label for="interestTerm">Interest Term (Years)</label>
        <input
          type="number"
          id="interestTerm"
          v-model.number="interestTerm"
          min="0"
          max="25"
        />
      </div>

      <div v-if="monthlyPayment !== null" class="payment-result">
        <p>
          Estimated
          {{ paymentFrequency === 'monthly' ? 'Monthly' : 'Semi-Monthly' }} Payment:
          <strong>{{ formatPrice(monthlyPayment) }}</strong>
        </p>
      </div>
    </div>
     <div v-else class="mortgage-calculator">
      <p>Select a region to estimate mortgage payments.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

const regions = ['toronto', 'mississauga', 'brampton', 'durham', 'york'];
const regionDataList = ref([]);
const pollInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
let intervalId;

// Mortgage Calculator related refs
const selectedRegion = ref(null);
const amortizationPeriod = ref(25); // Default value
const paymentFrequency = ref('monthly'); // Default value
const interestTerm = ref(5); // Default value, adjust as needed
const interestRate = 4.890; // Fixed interest rate
const monthlyPayment = ref(null);

const mortgageAmountInput = computed(() => {
  return selectedRegion.value ? formatPrice(selectedRegion.value.average_sale_price) : '';
});
const interestRateInput = computed(() => {
  return `${interestRate.toFixed(3)}%`;
});

const fetchRegionData = async (region) => {
  try {
    const response = await fetch(`https://www.realtorgpuri.com/api/v2/regions/${region}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for ${region}:`, error);
    return null;
  }
};

const updateData = async () => {
  const fetchedData = await Promise.all(regions.map(fetchRegionData));
  regionDataList.value = fetchedData.filter(data => data);
};

const formatPrice = (price) => {
  if (price === undefined || price === null) return 'N/A';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(price);
};

const selectRegion = (regionData) => {
  selectedRegion.value = regionData;
  calculateMortgage(); // Calculate mortgage when a region is selected
};

const calculateMortgage = () => {
  if (!selectedRegion.value) {
    monthlyPayment.value = null;
    return;
  }

  const principal = selectedRegion.value.average_sale_price;
  const annualInterestRate = interestRate / 100;
  const amortizationYears = amortizationPeriod.value;
  const termYears = interestTerm.value; // Term is currently not used in payment calc in standard formula, but could be relevant for more advanced calculations.

  if (!principal || !annualInterestRate || !amortizationYears) {
    monthlyPayment.value = null;
    return; // Exit if any necessary value is missing. Consider better error handling.
  }

  let monthlyInterestRate, numberOfPayments;

  if (paymentFrequency.value === 'monthly') {
    monthlyInterestRate = annualInterestRate / 12;
    numberOfPayments = amortizationYears * 12;
  } else if (paymentFrequency.value === 'semi-monthly') {
    monthlyInterestRate = annualInterestRate / 24;
    numberOfPayments = amortizationYears * 24;
  } else {
    monthlyPayment.value = null;
    return; // Handle invalid payment frequency
  }


  const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
  let calculatedPayment = numerator / denominator;

  if (!isFinite(calculatedPayment) || isNaN(calculatedPayment)) {
    monthlyPayment.value = null; // Handle cases where calculation results in Infinity or NaN
  } else {
    monthlyPayment.value = calculatedPayment;
  }
};

watch([selectedRegion, amortizationPeriod, paymentFrequency, interestTerm], () => {
  calculateMortgage();
});


onMounted(async () => {
  await updateData();
  intervalId = setInterval(updateData, pollInterval);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.selected {
  background-color: #cce5ff;
}

.mortgage-calculator {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.mortgage-calculator h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: calc(100% - 12px); /* Adjust width to account for padding and border */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Make padding and border part of the element's total width */
}

.payment-result {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f7ef;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}
</style>