/* global module:false */
module.exports = function( grunt ) {

	grunt.loadNpmTasks('grunt-jasmine-runner');
	
	grunt.initConfig({
		pkg: '<json:package.json>',

	    meta: {
	      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
	        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
	        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
	        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
	        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
	    },

	    watch: {
		    files: '<config:lint.files>',
		    tasks: 'lint test'
		},

	    min: {
	      dist: {
	        src: 'src/<%= pkg.name %>.js',
	        dest: 'dist/<%= pkg.name %>.js'
	      }
	    },

 		jasmine : {
	      src: ['spec/redirection-mobile-testable.js'],
	      specs : 'spec/**/*Spec.js'
	    },

		lint: {
	      files: ['src/<%= pkg.name %>.js', 'src/<%= pkg.name %>-self.js']
	    },

	    jshint: {
	      options: {
	        curly: true,
	        eqeqeq: true,
	        immed: true,
	        latedef: true,
	        newcap: true,
	        noarg: true,
	        sub: true,
	        undef: true,
	        boss: true,
	        eqnull: true,
	        browser: true
	      }
	    }
	});

	// Default task.
	grunt.registerTask('default', 'lint jasmine min');
	grunt.registerTask('travis', 'jasmine');
};