let sceneToRender;
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
var camera1;
var camera2;


const createScene = async () => {
    const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));


    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 2;
    box.position.y = 1;

    const fish = BABYLON.SceneLoader.ImportMesh(
        "",
        "./assets/",
        "fish.glb",
        scene,
        function (newMeshes) {
            newMeshes[0].scaling = new BABYLON.Vector3(4, 4, 4);
        }
    );
        //camera-1
   camera1 = new BABYLON.DeviceOrientationCamera(
    "DevOr_camera",
    new BABYLON.Vector3(0, 0, -10),
    scene
  );

  camera1.setTarget(new BABYLON.Vector3(0, 0, 0));

  camera1.angularSensibility = 2.5;
  camera1.moveSensibility = 2.5;


  camera1.attachControl(canvas, true);
  camera1.upperRadiusLimit = 10;
  camera1.lowerRadiusLimit = 4;
  

  //camera-2
  const alpha = -Math.PI / 4;
  const beta = Math.PI / 3;
  const radius = 8;
  const target = new BABYLON.Vector3(0, 0, 0);

   camera2 = new BABYLON.ArcRotateCamera(
    "Camera",
    alpha,
    beta,
    radius,
    target,
    scene
  );

  camera2.attachControl(canvas, true);
  camera2.lowerRadiusLimit = 3;
  camera2.upperRadiusLimit = 10;

    var advancedTexture =
          BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button1 = BABYLON.GUI.Button.CreateSimpleButton("button1", "Move");
    button1.top = "150px";
    button1.color = "white";
    button1.width = 0.2;
    button1.height = 0.1;
    button1.fontSize = 20;
    button1.background = "green";
    button1.cornerRadius = 40
    button1.bottom= "50px"
    button1.onPointerUpObservable.add(function () {
       scene.activeCamera = camera1
    });
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("button2", "Don't move");
    button2.top = "280px";
    button2.color = "white";
    button2.width = 0.2;
    button2.height = 0.1;
    button2.fontSize = 20;
    button2.cornerRadius = 40
    button2.background = "green";
    button2.onPointerUpObservable.add(function () {
        scene.activeCamera = camera2
    });
    advancedTexture.addControl(button1);
    advancedTexture.addControl(button2);
    
    const layer = new BABYLON.Layer("layer", null, scene, true);
    BABYLON.VideoTexture.CreateFromWebCam(
        scene,
        (videoTexture) => {
            videoTexture.vScale = -1.0;
            videoTexture.uScale =
                ((canvas.width / canvas.height) *
                    videoTexture.getSize().height) /
                videoTexture.getSize().width;
            layer.texture = videoTexture;
        },
        {
            maxWidth: canvas.width,
            maxHeight: canvas.height,
            facingMode: "environment",
        }
    );         
    return scene;
};





scene = createScene();
console.log(scene);
scene.then(function (returnedScene) {
    sceneToRender = returnedScene;
});

// Run render loop to render future frames.
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Handle browser resize.
// window.addEventListener("resize", function () {
//     engine.resize();
// });



