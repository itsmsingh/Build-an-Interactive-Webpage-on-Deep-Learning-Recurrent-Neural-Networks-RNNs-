// RNN Sequence Processing
let rnnChart;
function updateRNN() {
  const input = document.getElementById('rnn-input').value;
  const sequence = input.split(',').map(Number);

  if (rnnChart) {
    rnnChart.destroy(); // Destroy the old chart
  }

  const ctx = document.getElementById('rnn-chart').getContext('2d');
  rnnChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sequence.map((_, i) => `Step ${i + 1}`),
      datasets: [{
        label: 'Hidden State',
        data: sequence,
        borderColor: '#2c3e50',
        fill: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Ensure the chart fits the container
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// LSTM Gates in Action
let lstmChart;
function updateLSTM() {
  const forgetGate = parseFloat(document.getElementById('forget-gate').value);
  const inputGate = parseFloat(document.getElementById('input-gate').value);
  const outputGate = parseFloat(document.getElementById('output-gate').value);

  const cellState = (forgetGate * 0.5) + (inputGate * 0.3) + (outputGate * 0.2);

  if (lstmChart) {
    lstmChart.destroy(); // Destroy the old chart
  }

  const ctx = document.getElementById('lstm-chart').getContext('2d');
  lstmChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Forget Gate', 'Input Gate', 'Output Gate', 'Cell State'],
      datasets: [{
        label: 'Gate Values',
        data: [forgetGate, inputGate, outputGate, cellState],
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6'],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Ensure the chart fits the container
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
        },
      },
    },
  });
}

// Quiz Feedback
function checkAnswer(questionNumber) {
  const answer = document.querySelector(`input[name="q${questionNumber}"]:checked`).value;
  let feedback = '';
  if (questionNumber === 1 && answer === 'B') {
    feedback = '😊 Correct! The forget gate discards irrelevant information.';
  } else if (questionNumber === 2 && answer === 'B') {
    feedback = '😊 Correct! Vanishing gradients are a challenge for standard RNNs.';
  } else if (questionNumber === 3 && answer === 'B') {
    feedback = '😊 Correct! Chatbots use RNNs for generating human-like responses.';
  } else {
    feedback = '😢 Incorrect. Try again!';
  }
  document.getElementById(`q${questionNumber}-feedback`).innerText = feedback;
}