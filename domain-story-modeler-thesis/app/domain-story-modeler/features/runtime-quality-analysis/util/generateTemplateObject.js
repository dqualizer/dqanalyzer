import { createAnalysisResultsView } from '../analysis-results/analysisResultsView';
import { createToastNotification } from './notifications';

export const createDisabledGenerateBtn = () => {
  let generateButtonContainer = document.createElement('div');
  let getSummaryContainer = document.getElementById('runtimeAnalysisSummaryContainer');
  generateButtonContainer.id = 'generateButtonContainer';

  let generateAndPush__btn = document.createElement('button');
  generateAndPush__btn.innerText = 'Execute';
  generateAndPush__btn.classList.add('btn');
  generateAndPush__btn.classList.add('btn-primary');
  generateAndPush__btn.classList.add('custom-button');
  generateAndPush__btn.disabled = true;
  generateAndPush__btn.id = 'generateAndPush__btn';

  generateAndPush__btn.addEventListener('click', () => {
    console.log('event_handler');

    pushToQueue();
    createToastNotification('Congrats! Your test is about to be executed.', 'success');

    createAnalysisResultsView();
  });

  generateButtonContainer.appendChild(generateAndPush__btn);
  getSummaryContainer.appendChild(generateButtonContainer);
};

// eslint-disable-next-line no-undef
const pushToQueue = () => {
  console.log('pushing to queue');
  let rpa_definition = localStorage.getItem('runtimeQualityAnalysis');
  console.log(JSON.parse(rpa_definition));
  var myHeaders = new Headers();
  myHeaders.append('rqa_definition', JSON.parse(rpa_definition));

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: rpa_definition

  };

  const backend_url = new URL('/api/rqa', window._env_.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL);

  fetch(backend_url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));

  console.log('pushed to queue');
};
