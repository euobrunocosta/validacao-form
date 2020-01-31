const form = document.getElementById('form')
const usuario = document.getElementById('usuario')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const senha2 = document.getElementById('senha2')

validar = (campo, regra, mensagem = '', paramExtra = false) => {
  let sucesso = null;
  switch (regra) {
    case 'obrigatorio':
      if (mensagem === '') mensagem = 'Este campo é obrigatório!';
      if (campo.value.trim() !== '') sucesso = true
      else sucesso = false
      break
    case 'caracteres':
      let array = paramExtra.split('-')
      if ((array[0] !== '') && (array[1] !== '')) {
        mensagem = `Este campo deve ter entre ${array[0]} e ${array[1]} caracteres`
        if (
          (campo.value.length >= parseInt(array[0])) && 
          (campo.value.length <= parseInt(array[1]))
          ) sucesso = true
        else sucesso = false
      }
      else if (array[0] !== '') {
        mensagem = `Este campo requer no mínimo ${array[0]} caracteres`
        if (campo.value.length >= parseInt(array[0])) sucesso = true
        else sucesso = false
      }
      else {
        mensagem = `Este campo requer no máximo ${array[1]} caracteres`
        if (campo.value.length <= parseInt(array[0])) sucesso = true
        else sucesso = false
      }
      break
    case 'email':
      if (mensagem === '') mensagem = 'Informe um email válido'
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(campo.value.trim())) sucesso = true
      else sucesso = false
      break
    case 'igual':
      if (mensagem === '') mensagem = 'Os campos de senha não coincidem'
      if (paramExtra.value.trim() === '') {  }
      else if (campo.value === paramExtra.value) sucesso = true
      else sucesso = false
      break
  }
  if (sucesso == null) escondeSucessoErro(campo)
  else if (sucesso) mostraSucesso(campo)
  else if (!sucesso) mostraErro(campo, mensagem)

}

mostraErro = (campo, mensagem) => {
  const formControl = campo.parentElement
  formControl.className = 'form-control erro'
  const small = formControl.querySelector('small')
  small.innerText = mensagem
}

mostraSucesso = campo => {
  const formControl = campo.parentElement
  formControl.className = 'form-control sucesso'
}

escondeSucessoErro = campo => {
  const formControl = campo.parentElement
  formControl.className = 'form-control'
}

form.addEventListener('submit', e => {

  e.preventDefault()
  
  validar(usuario, 'obrigatorio', 'O campo de usuario é obrigatório')
  validar(usuario, 'caracteres', '', '3-25')
  // se apenas valor minimo '5-'
  // se apenas valor maximo '-5'
  // se valores minimo e maximo '3-8'
  validar(email, 'obrigatorio', 'O campo de email é obrigatório')
  validar(email, 'email')
  validar(senha, 'obrigatorio', 'Crie uma senha')
  validar(senha, 'caracteres', 'Sua senha deve conter pelo menos 6 caracteres', '6-')
  validar(senha2, 'igual', '', senha)

})
