const Constants = require('./constants');
const Helpers   = require('./helpers');

const initGlobals = (grunt) => {
    // ----- global info -----
    global.node_modules_paths = Constants.node_modules_paths;
    global.release_config     = Constants.release_config;

    // ----- release info -----
    global.is_release = Helpers.isRelease(grunt);
    if (global.is_release) {
        Helpers.checkSection(grunt); // To prevent mistakes, section is mandatory when releasing
        global.release_target = Helpers.getReleaseTarget(grunt);
    }

    // ----- branch info -----
    if (global.release_target) {
        global.release_info  = global.release_config[global.release_target];
        global.branch_prefix = '';
        global.branch        = global.release_info.target_folder;
    } else {
        global.branch_prefix = Constants.config.branch_prefix;
        global.branch        = grunt.option('branch');
    }

    // ----- section -----
    global.section = Helpers.getSection(grunt);

    // ----- paths -----
    global.dist       = Helpers.getDistPath();
    global.dist_app_2 = `${global.dist}/${Constants.config.app_2_folder}`;
    global.path       = grunt.option('path');

    // ----- compile templates -----
    global.compileCommand = params => Helpers.generateCompileCommand(params);
};

module.exports = {
    initGlobals,
};
