const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, msg, args) => {

  const msgResX = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**Você não possui permissão para executar este comando.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  const msgResX2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**O uso deste comando não é permitido neste canal.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  if(!msg.member.roles.some(r => ["Div"].includes(r.name)) && !config.idAdmin.find(id => id == msg.author.id)) return msg.channel.send(msgResX);
  if(msg.channel.id != config.idChannelCmdClient && msg.channel.id != config.idChannelAdmin) return msg.channel.send(msgResX2);
  
  let msgSend = args.join(" ");

  let dnd = client.users.filter(m => m.presence.status === 'dnd');
  let countMembers = dnd.size;
  let countSendO = 0;
  let countSendN = 0;

  const msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**Dnd**`, `\n\n**Mensagem sendo enviada para ${countMembers} pessoas.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  try{
    msg.channel.send(msgRes);
    dnd.forEach((f) => {
        f.send(msgSend).then(() => {
          countSendO = countSendO+1;
          console.log(`Cliente: ${msg.author.tag} | Comando: Dnd | Membro: ${f.tag} | Status: Mensagem enviada | Total enviadas ${countSendO} de ${countMembers}.`);
        }).catch(() => {
          countSendN = countSendN+1;
          console.log(`Cliente: ${msg.author.tag} | Comando: Dnd | Membro: ${f.tag} | Status: Mensagem não enviada | Total não enviadas ${countSendN} de ${countMembers}.`);
        });
    });
  }catch(err){
    msg.channel.send(`Não foi iniciado o envio de mensagens, erro: ${err}`);
  }

}

