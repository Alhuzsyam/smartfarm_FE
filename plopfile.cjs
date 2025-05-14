module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a Vue component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}.vue',
        templateFile: 'plop-templates/Component.vue.hbs',
      },
    ],
  })
}
