/* global tm */

const mainEl = document.querySelector('#container');

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`여러분이 손을 들었는지 아닌지 컴퓨터가 인식할 수 있도록 가르쳐 봅시다.`,
    description: tm.html`웹캠에 대한 액세스를 허용하려면 "시작"을 클릭하세요. 참고: 촬영된 이미지는 사용자의 개인 정보로 취급되며 사용자의 컴퓨터에서만 사용됩니다.`
  },
  classes: [
    {
      name: "손 올림",
      title: "손 올린 모습 촬영하기",
      description:
        "손을 올린 채로 촬영하기 버튼을 눌러 최소 20장의 사진을 찍어주세요. 사진 프레임 안에 손이 들어왔는지 확인해주세요."
    },
    {
      name: "손 내림",
      title: "손 내린 모습 촬영하기",
      description:
        "손을 내린 채로 촬영하기 버튼을 눌러 최소 20장의 사진을 찍어주세요. 사진 프레임 안에 손이 들어왔는지 확인해주세요."
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll('.prediction-image');
    let highestProb = Number.MIN_VALUE;
    let highestIndex = -1;
    predictions.forEach((pred, i) => {
      if (pred.probability > highestProb) {
        highestProb = pred.probability;
        highestIndex = i;
      }
    });
    images.forEach((img, i) => {
      if (i === highestIndex) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onReady: () => {
    const inferenceCamera = wizard.createInferenceCamera({
      size: 270
    });
    const cameraContainer = document.querySelector('#inference-camera-container');
    cameraContainer.appendChild(inferenceCamera);
    mainEl.classList.add('ready');
  }
});

document.querySelector('#train-model-button').addEventListener('click', () => wizard.open());
