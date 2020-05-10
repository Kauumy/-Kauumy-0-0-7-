const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, msg, args) => {

  /*
  var msgResX = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**Você não possui permissão para executar este comando.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  var msgResX2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**O uso deste comando não é permitido neste canal.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  if(!config.idAdmin.find(id => id == msg.author.id)) return msg.channel.send(msgResX);
  if(msg.channel.id != config.idChannelAdmin) return msg.channel.send(msgResX2);
  */

  const msgInvite = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**Convite**`, `\n\n**O convite do bot está [Aqui](https://discordapp.com/oauth2/authorize?client_id=${config.id}&permissions=522304&scope=bot)!**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  try{
    msg.channel.send(msgInvite).then((m) => {
        console.log(`Cliente: ${msg.author.tag} | Comando: Invite | Resposta: Invite enviado no canal.`);
		m.delete(30000);
    }).catch((err) => {
		console.log(`Cliente: ${msg.author.tag} | Comando: Invite | Resposta: Invite não enviado no canal. | Erro: ${err}`);
    });
  }catch(err){
    msg.channel.send(`Não foi iniciado o envio de mensagens, erro: ${err}`);
  }

}

