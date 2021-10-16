
  onRuntimeInitialized: initRDKitModule().then(function (instance) {
      RDKitModule = instance;
      console.log('version: ' + RDKitModule.version());
  });

  