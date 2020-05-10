const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, msg, args) => {

  //if(!config.idAdmin.find(id => id == msg.author.id)) return msg.reply(`Você não possui permissão para executar este comando.`);
  //if(msg.channel.id != config.idChannelAdmin) return msg.reply(`O uso deste comando não é permitido neste canal.`);
  
  const msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**Lista de ajuda**`, `\n\n**Prefixo [${config.prefix}]**\n\n`, false)
	  .addField(`**Permissão**`, `\n\n**Crie a tag "Div" para que possa desfrutar do comando ${config.prefix}AllG**\n\n`, false)
    .addField(`**Comandos**`, `\n\n**Ab** [Envia para todos os ausentes.]\n**All** [Envia para todos.]\n**AllG** [Envia para todos do grupo onde o comando for executado.]\n**Bot** [Envia mensagem de anuncio para todos add o bot em seu servidor.]\n**Dnd** [Envia mensagem para os ocupados.]\n**Help** [Lista de ajuda.]\n**Off** [Envia mensagem para todos os offlines.]\n**On** [Envia mensagem para todos os Onlines.]\n**OnAll** [Envia mensagem para todos os que estão onlines, não importantando se está ausente ou ocupado.]\n**Ping** [Verifica conexão do bot e a do usuario.]\n**Servers** [Lista os servidores e mostra os membros deles que o bot está.]\n**Status** [Mostra um status geral do bot.]\n**Invite** [Mostra o convite do bot.]\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  msg.channel.send(msgRes).then((m) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Help | Resposta: Help enviado no canal.`);
    m.delete(60000);
  }).catch((err) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Help | Resposta: ${err}`);
  });

}

