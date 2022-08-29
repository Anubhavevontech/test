let sceneToRender;
const cam = document.getElementById("move").value;
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);


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
            newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
        }
    );
    //    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2,  1, -2, new BABYLON.Vector3(0, 0, 0));
   

    // camera1.attachControl(canvas, true);
    // camera1.lowerRadiusLimit = 8
    // camera1.upperRadiusLimit = 15

    var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, -10), scene);

    // Targets the camera to a particular position
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    
    // Sets the sensitivity of the camera to movement and rotation
    camera.angularSensibility = 1;
    camera.moveSensibility = 1;
    
    // Attach the camera to the canvas
    camera.attachControl(canvas, true);




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



