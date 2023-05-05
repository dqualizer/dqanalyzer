import { saveLoadTestTemplateToLocalStorage } from '../performance/saveLoadtestTemplate';
import { getNodeName, getNodeRectElementAndSetColor } from '../../util/util';
import {
  INFO_ACCURACY,
  LOADTEST_DURATION_INFO,
  INFO_RESPONSE_MEASURE,
  INFO_STIMULUS,
  INFO_LOAD_DESIGN,
  INFO_HIGHEST_LOAD,
  INFO_TIME_TO_HIGHEST_LOAD,
  INFO_TYPE_OF_INCREASE,
  INFO_BASE_LOAD,
  INFO_RESULT_METRICS
} from '../../util/RuntimeAnalysisConstants';
import { createDisabledGenerateBtn } from '../../util/generateTemplateObject';
import * as werkstattModel from './werkstatt.json';

/**
 * Get root container element
 */
let modal__container = document.getElementById('modal__container');

const createMappingTemplateView = (selectedID) => {
  console.log(werkstattModel);

  /**
     * Create html elements
     */
  let header = document.createElement('h3');
  header.innerText = 'Mapping Specification';
  header.classList.add('template-header');

  let ruler = document.createElement('hr');

  let mappingTemplateModal = document.createElement('div');
  mappingTemplateModal.id = `mappingTemplateModal_${selectedID}`;
  mappingTemplateModal.classList.add('modal_resilience');

  let mappingTemplateModalContent = document.createElement('div');
  mappingTemplateModalContent.id = `mappingTemplateModalContent_${selectedID}`;
  mappingTemplateModalContent.classList.add('modal_resilience_content');

  /**
     * Append child nodes to root container element
     */
  modal__container.appendChild(mappingTemplateModal);
  mappingTemplateModal.appendChild(mappingTemplateModalContent);
  mappingTemplateModalContent.appendChild(header);
  mappingTemplateModalContent.appendChild(ruler);

  createAndAppendMappingInputFields(selectedID);

//   loadTestTemplateModalContent.appendChild(ruler);
//   createAndAppendResultViewMetrics(selectedID);
//   createButtonContainer(selectedID);
};

const checkIfTemplateComplete = (selectedID) => {

  let getDuration__input = document.getElementById(`accuracy_slider_${selectedID}`);
  let getDurationValue = getDuration__input.value;

  let getResponseTime__input = document.getElementById(`responseTime__input_${selectedID}`);
  let getResponseTimeValue = getResponseTime__input.checked;

  let getPercentileNinety__input = document.getElementById(`percentileNinety__input_${selectedID}`);
  let getNinetyPercentileValue = getPercentileNinety__input.checked;

  let getPercentileNinetyFive__input = document.getElementById(`percentileNinetyFive__input_${selectedID}`);
  let getNinetyFivePercentileValue = getPercentileNinetyFive__input.checked;

  if (!getDurationValue || (!getResponseTimeValue && !getNinetyPercentileValue && !getNinetyFivePercentileValue)) {
    getNodeRectElementAndSetColor(selectedID, false, 'Loadtest Template');
  }
};

const createButtonContainer = (selectedID) => {

  let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);
  let getMappingTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);

  let loadTestTemplateButtonContainer = document.createElement('div');
  loadTestTemplateButtonContainer.classList.add('btn-container-parent');

  let loadTestTemplate__save_btn = document.createElement('button');
  loadTestTemplate__save_btn.id = 'loadTestTemplate__save_btn';
  loadTestTemplate__save_btn.innerText = 'Save';
  loadTestTemplate__save_btn.classList.add('btn');
  loadTestTemplate__save_btn.classList.add('btn-primary');
  loadTestTemplate__save_btn.classList.add('custom-btn');

  let loadTestTemplate__close_btn = document.createElement('button');
  loadTestTemplate__close_btn.innerText = 'Close';
  loadTestTemplate__close_btn.classList.add('btn');
  loadTestTemplate__close_btn.classList.add('btn-secondary');
  loadTestTemplate__close_btn.classList.add('custom-btn');

  loadTestTemplate__save_btn.addEventListener('click', () => {
    saveLoadTestTemplateToLocalStorage(selectedID);
  });

  loadTestTemplate__close_btn.addEventListener('click', () => {
    getLoadTestTemplateModal.style.display = 'none';
    checkIfTemplateComplete(selectedID);
  });

  loadTestTemplateButtonContainer.appendChild(loadTestTemplate__save_btn);
  loadTestTemplateButtonContainer.appendChild(loadTestTemplate__close_btn);

  getMappingTemplateModalContent.appendChild(loadTestTemplateButtonContainer);
};

const createAndAppendMappingInputFields = (selectedID) => {

  let getMappingTemplateModalContent = document.getElementById(`mappingTemplateModalContent_${selectedID}`);
  let getMappingTemplateModal = document.getElementById(`mappingTemplateModal_${selectedID}`);

  let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

  let loadTestTemplateModalContentTopLevelInputContainer = document.createElement('div');
  loadTestTemplateModalContentTopLevelInputContainer.id = `loadTestTemplateModalContentTopLevelInputContainer_${selectedID}`;
  loadTestTemplateModalContentTopLevelInputContainer.classList.add('input__top__container');

  let loadTestTemplatInputContainer__left = document.createElement('div');
  loadTestTemplatInputContainer__left.id = 'loadTestTemplatInputContainer__left';
  loadTestTemplatInputContainer__left.classList.add('input__container');

  let loadTestTemplatInputContainer__right = document.createElement('div');
  loadTestTemplatInputContainer__right.id = `loadTestTemplatInputContainer__right_${selectedID}`;
  loadTestTemplatInputContainer__right.classList.add('input__container');

  let artifactDescriptor = document.createElement('p');
  artifactDescriptor.classList.add('label-padding');
  artifactDescriptor.innerText = 'Domain Story Activity';

  let artifactValue = document.createElement('p');
  artifactValue.classList.add('label-padding');
  artifactValue.innerText = getNodeName(selectedID);

  let artifactValueContainer = document.createElement('div');
  artifactValueContainer.classList.add('checkbox-child');

  let domainActivityLabelContainer = document.createElement('div');
  domainActivityLabelContainer.classList.add('label-container');
  domainActivityLabelContainer.id = `domainActivityLabelContainer_${selectedID}`;

  let domainActivityContainer__label = document.createElement('label');
  domainActivityContainer__label.setAttribute('for', `domainActivityLabelContainer_${selectedID}`);
  domainActivityContainer__label.innerText = 'Corresponding Domain Activity from Mapping';

  // let stimulusSelection__info = document.createElement('i');
  // stimulusSelection__info.classList.add('bi');
  // stimulusSelection__info.classList.add('bi-info-circle');
  // stimulusSelection__info.classList.add('toolTip');

  // stimulusSelection__info.addEventListener('mouseover', () => {
  //   stimulusSelection__info_text.style.display = 'block';
  // });

  // stimulusSelection__info.addEventListener('mouseleave', () => {
  //   stimulusSelection__info_text.style.display = 'none';
  // });

  // let stimulusSelection__info_text = document.createElement('span');
  // stimulusSelection__info_text.classList.add('tooltipText');
  // stimulusSelection__info_text.id = `stimulusSelection__info_text_${selectedID}`;
  // stimulusSelection__info_text.innerText = INFO_STIMULUS;

  let stimulusParentContainer = document.createElement('div');
  stimulusParentContainer.classList.add('checkbox-parent');

  let stimulusLoadPeakChildContainer = document.createElement('div');
  stimulusLoadPeakChildContainer.classList.add('checkbox-child');

  let stimulusChildContainer = document.createElement('div');
  stimulusChildContainer.classList.add('checkbox-child');

  let stimulusSelectElement = document.createElement('select');
  stimulusSelectElement.id = `stimulusSelectElement_${selectedID}`;

  let options = [];
  werkstattModel.objects.forEach((object) => {
    object.activities?.forEach((activity) => {
      let option = document.createElement('option');
      option.key = activity.name;
      option.text = activity.name;
      options.push(option);
    });
  });

  options.forEach((option => {
    stimulusSelectElement.appendChild(option);
  }));

  //   let optionLoadPeak = document.createElement('option');
  //   optionLoadPeak.key = 'loadpeak';
  //   optionLoadPeak.text = 'Load Peak';

  //   let optionConstantLoad = document.createElement('option');
  //   optionConstantLoad.key = 'constant';
  //   optionConstantLoad.text = 'Constant Load';

  //   let optionLoadIncrease = document.createElement('option');
  //   optionLoadIncrease.key = 'constant';
  //   optionLoadIncrease.text = 'Load Increase';

  //   stimulusSelectElement.appendChild(optionLoadPeak);
  //   stimulusSelectElement.appendChild(optionLoadIncrease);
  //   stimulusSelectElement.appendChild(optionConstantLoad);

  stimulusSelectElement.addEventListener('change', () => {

  });


  /**
     * Appending child nodes
     */


  domainActivityLabelContainer.appendChild(domainActivityContainer__label);

  // domainActivityLabelContainer.appendChild(stimulusSelection__info);
  // domainActivityLabelContainer.appendChild(stimulusSelection__info_text);

  stimulusChildContainer.appendChild(domainActivityLabelContainer);
  stimulusChildContainer.appendChild(stimulusSelectElement);


  artifactValueContainer.appendChild(artifactDescriptor);
  artifactValueContainer.appendChild(artifactValue);





  loadTestTemplatInputContainer__left.appendChild(artifactValueContainer);
  loadTestTemplatInputContainer__left.appendChild(stimulusChildContainer);

  loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__left);
  loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__right);
  getMappingTemplateModalContent.appendChild(loadTestTemplateModalContentTopLevelInputContainer);

  if (!getGenerateAndPush__btn) {
    createDisabledGenerateBtn();
  }

  getMappingTemplateModal.style.display = 'block';
};


const createAndAppendResultViewMetrics = (selectedID) => {
  let getMappingTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);

  let resultViewTopContainer = document.createElement('div');
  resultViewTopContainer.classList.add('input__container');

  let resultViewMetricsContainer = document.createElement('div');
  resultViewMetricsContainer.id = `resultViewMetricsContainer_${selectedID}`;
  resultViewMetricsContainer.classList.add('checkbox-parent');
  resultViewMetricsContainer.classList.add('result-view-container');

  let resultViewMetrics__label__container = document.createElement('div');
  resultViewMetrics__label__container.classList.add('label-container');

  let resultViewMetrics__label = document.createElement('label');
  resultViewMetrics__label.setAttribute('for', `resultViewMetricsContainer_${selectedID}`);
  resultViewMetrics__label.innerText = 'Metrics you would like to include in the Result (*)';
  resultViewMetrics__label.classList.add('form-check-label');
  resultViewMetrics__label.classList.add('label-padding');

  let resultViewMetrics__info = document.createElement('i');
  resultViewMetrics__info.classList.add('bi');
  resultViewMetrics__info.classList.add('bi-info-circle');
  resultViewMetrics__info.classList.add('toolTip');

  resultViewMetrics__info.addEventListener('mouseover', () => {
    resultViewMetrics__info_text.style.display = 'block';
  });

  resultViewMetrics__info.addEventListener('mouseleave', () => {
    resultViewMetrics__info_text.style.display = 'none';
  });

  let resultViewMetrics__info_text = document.createElement('span');
  resultViewMetrics__info_text.classList.add('tooltipText');
  resultViewMetrics__info_text.id = `resultViewMetrics__info_text_${selectedID}`;
  resultViewMetrics__info_text.innerText = INFO_RESULT_METRICS;

  let responseTimeChildContainer = document.createElement('div');
  responseTimeChildContainer.classList.add('checkbox-child');

  let responseTimeLabelContainer = document.createElement('div');
  responseTimeLabelContainer.classList.add('label-container');

  let responseTime__input = document.createElement('input');
  responseTime__input.type = 'checkbox';
  responseTime__input.classList.add('form-check-input');
  responseTime__input.id = `responseTime__input_${selectedID}`;

  let responseTimeInput__label = document.createElement('label');
  responseTimeInput__label.setAttribute('for', `responseTime__input_${selectedID}`);
  responseTimeInput__label.innerText = 'Response Times';
  responseTimeInput__label.classList.add('form-check-label');

  responseTimeChildContainer.appendChild(responseTimeInput__label);
  responseTimeChildContainer.appendChild(responseTime__input);

  let percentileNinetyChildContainer = document.createElement('div');
  percentileNinetyChildContainer.classList.add('checkbox-child');

  let percentileNinety__input = document.createElement('input');
  percentileNinety__input.id = `percentileNinety__input_${selectedID}`;
  percentileNinety__input.type = 'checkbox';
  percentileNinety__input.classList.add('form-check-input');

  let percentileNinety__label = document.createElement('label');
  percentileNinety__label.setAttribute('for', `percentileNinety__input_${selectedID}`);
  percentileNinety__label.innerText = '90th Percentile';
  percentileNinety__label.classList.add('form-check-label');

  let percentileNinetyFiveChildContainer = document.createElement('div');
  percentileNinetyFiveChildContainer.classList.add('checkbox-child');

  let percentileNinetyFive__input = document.createElement('input');
  percentileNinetyFive__input.id = `percentileNinetyFive__input_${selectedID}`;
  percentileNinetyFive__input.type = 'checkbox';
  percentileNinetyFive__input.classList.add('form-check-input');

  let percentileNinetyFive__label = document.createElement('label');
  percentileNinetyFive__label.setAttribute('for', `percentileNinetyFive__input_${selectedID}`);
  percentileNinetyFive__label.innerText = '95th Percentile';
  percentileNinetyFive__label.classList.add('form-check-label');

  resultViewMetrics__label__container.appendChild(resultViewMetrics__label);
  resultViewMetrics__label__container.appendChild(resultViewMetrics__info);
  resultViewMetrics__label__container.appendChild(resultViewMetrics__info_text);

  percentileNinetyFiveChildContainer.appendChild(percentileNinetyFive__label);
  percentileNinetyFiveChildContainer.appendChild(percentileNinetyFive__input);

  percentileNinetyChildContainer.appendChild(percentileNinety__label);
  percentileNinetyChildContainer.appendChild(percentileNinety__input);

  resultViewMetricsContainer.appendChild(responseTimeChildContainer);
  resultViewMetricsContainer.appendChild(percentileNinetyChildContainer);
  resultViewMetricsContainer.appendChild(percentileNinetyFiveChildContainer);
  resultViewTopContainer.appendChild(resultViewMetrics__label__container);
  resultViewTopContainer.appendChild(resultViewMetricsContainer);

  getMappingTemplateModalContent.appendChild(resultViewTopContainer);
};

/**
 * Creates the load test template view based on the selected node.
 */
export const createMappingTemplate = (selectedID) => {

  let mappingTemplateModal = document.getElementById(`mappingTemplateModal_${selectedID}`);

  if (mappingTemplateModal) {
    mappingTemplateModal.style.display = 'block';
  } else {
    createMappingTemplateView(selectedID);
    console.log('Creating template...');
  }
};