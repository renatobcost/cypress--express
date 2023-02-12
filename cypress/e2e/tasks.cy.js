/// <reference types="cypress" />

describe('tarefas', () => {

    context('cadastro', () => {

        it('deve cadastrar uma nova tarefa', () => {
            const taskName= 'Ler um livro'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
    
        it('não deve permitir tarefa duplicada', () => {
            const task = {
                name: 'Ler dois livros',
                is_done: false
            }
            
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
    
        it('campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    
    })

    context('exclusão', () => {
        
        it('deve excluir uma tarefa', () => {
            const task = {
                name: 'Pagar conta de energia',
                is_done: false
            }
            
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })

    context('concluído', () => {
        
        it('deve concluir uma tarefa', () => {
            const task = {
                name: 'Pagar conta de consumo',
                is_done: false
            }
            
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
            
            cy.removeTaskByName(task.name)
        })
    })

    
})
