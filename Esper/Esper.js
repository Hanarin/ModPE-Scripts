//기본 아이템 : 철 신발, 바지, 갑옷, 투구 / 철 칼

var player= new Array();
var esper = new Array();
var observer = new Array();
var isPlaying = false;

var AblityList = [
  {
    //1
    name : "능력 복사 (액티브)",
    detail : ["전투중 1회에 한해서 자신이 공격한 상대의 능력을 복사합니다. (레벨 1)", "전투중 1회에 한해서 자신이 공격한 상대의 능력을 복사합니다. (레벨 2)", "전투중 1회에 한해서 자신이 공격한 상대의 능력을 복사합니다. (레벨 3)"]
  }, {
    //2
    name : "다이아몬드 신체 (패시브)",
    detail : ["자신은 기본적으로 다이아몬드 신발과 바지와 투구를 입게 됩니다.", "자신은 기본적으로 다이아몬드 신발, 바지, 갑옷, 투구를 입게 됩니다.", "자신은 기본적으로 다이아몬드 신발, 바지, 갑옷, 투구를 입게 되며 초반 1분간 저항1의 버프를 받게 됩니다."]
  }, {
    //3
    name : "독의 진 (버프)",
    detail : ["(쿨타임 1분) 20초 간 자신으로부터 반경 3블럭 이내에 있는 모든 플레이어에게 독1의 버프를 부여합니다.", "(쿨타임 1분) 20초 간 자신으로부터 반경 5블럭 이내에 있는 모든 플레이어에게 독1의 버프를 부여합니다.", "(쿨타임 1분 15초) 15초 간 자신으로부터 반경 5블럭 이내에 있는 모든 플레이어에게 독2의 버프를 부여합니다."]
  }, {
    //4
    name : "라이트닝 (액티브)",
    detail : ["(쿨타임 10초) 자신으로부터 5블럭 이내에 있는 플레이어 중 가장 가까운 플레이어에게 번개를 떨어뜨립니다. 3%의 확률로 자신에게도 번개가 떨어집니다.", "(쿨타임 17초) 자신으로부터 7블럭 이내에 있는 플레이어 중 가장 가까운 플레이어에게 번개를 떨어뜨립니다. 0.5%의 확률로자신에게도 번개가 떨어집니다.", "(쿨타임 25초) 자신으로부터 10블럭 이내에 있는 플레이어 중 최대 2명에게 번개를 떨어뜨립니다."]
  }, {
    //5
    name : "성수 (패시브)",
    detail : ["자신이 상대방에게 데미지를 입으면 10%의 확률로 자신의 위치에 물이 뿌려집니다. 그리고 자신이 물 위에 있을 경우 속도가 빨라집니다.", "자신이 상대방에게 데미지를 입으면 30%의 확률로 자신의 위치에 물이 뿌려집니다. 그리고 자신이 물 위에 있을 경우 속도가 빨라집니다.", "자신이 상대방에게 데미지를 입으면 40%의 확률로 자신의 위치에 3×3으로 물이 뿌려집니다. 자신이 물 위에 있을 경우 속도가 빨라집니다."]
  }, {
    //6
    name : "순간이동 (액티브)",
    detail : ["(쿨타임 5초) 자신이 보는 방향으로 3칸 앞으로 순간이동 합니다.", "(쿨타임 3초) 자신이 보는 방향으로 3칸 앞으로 순간이동 합니다.", "(쿨타임 3초) 자신이 보는 방향으로 4칸 앞으로 순간이동 합니다. 순간이동을 하고 난 후 순간이동 하기 전 위치에 약한 폭발이 일어납니다."]
  }, {
    //7
    name : "신체 강화 (버프)",
    detail : ["(쿨타임 1분) 자신에게 저항1의 버프를 20초간 부여합니다.", "(쿨타임 1분 30초) 자신에게 저항1,신속1의 버프를 20초간 부여합니다.", "(쿨타임 3분) 자신에게 저항2, 신속2, 힘1, 점프강화1, 재생1, 멀미3의 버프를 40초간 부여합니다."]
  }, {
    //8
    name : "아이스 (액티브)",
    detail : ["(쿨타임 20초) 자신이 포커스를 맞춘 블럭에 얼음으로 된 구를 생성합니다. 구 안은 물로 채워집니다. (반지름 4, 범위 10블럭 이내)", "(쿨타임 25초) 자신이 포커스를 맞춘 블럭에 얼음으로 된 구를 생성합니다. 구 안은 물로 채워집니다. (반지름 5, 범위 15블럭 이내)", "(쿨타임 35초) 자신이 포커스를 맞춘 블럭에 얼음으로 된 구를 생성합니다. 구 안은 물로 채워집니다. 그리고 자신은 물 속에서 숨을 오래 참을 수 있습니다. (반지름 7, 범위 20블럭 이내)"]
  }, {
    //9
    name : "용암 (액티브)",
    detail : ["(쿨타임 1분) 자신이 포커스를 맞춘 곳에 2×2크기의 용암이 3초 간 형성됩니다. (범위 10블럭 이내)", "(쿨타임 1분 30초) 자신이 포커스를 맞춘 곳에 3×3크기의 용암이 3초 간 형성됩니다. (범위 10블럭 이내)", "(쿨타임 1분 30초) 자신이 포커스를 맞춘 곳에 3×3크기의 용암이 5초간 형성됩니다. (범위 10블럭 이내)"]
  }, {
    //10
    name : "은신 (버프)",
    detail : ["(쿨타임 30초) 능력 사용시 갑옷이 인벤토리로 옮겨지며 투명화 버프를 10초 간 받습니다. 상대방을 공격하거나 상대방에게 피격당하였을 경우 투명화 버프가 사라지며 갑옷이 다시 입혀집니다.", "(쿨타임 45초) 능력 사용시 갑옷이 인벤토리로 옮겨지며 투명화, 신속 1의 버프를 20초 간 받습니다. 상대방을 공격하거나 상대방에게 피격당하였을 경우 모든 버프가 사라지며 갑옷이 다시 입혀집니다.", "(쿨타임 50초) 능력 사용시 갑옷이 인벤토리로 옮겨지며 투명화, 신속 2, 힘 1의 버프를 20초 간 받습니다.상대방을 공격하거나 상대방에게 공격당하였을 경우 모든 버프가 사라지며 갑옷이 다시 입혀집니다."]
  }, {
    //11
    name : "중력화살 (액티브)",
    detail : ["(쿨타임 5초) 자신이 포커스를 맞춘 위치에 화살이 3×3으로 빠른 속도로 떨어집니다. (범위 10블럭 이내)", "(쿨타임 5초) 자신이 포커스를 맞춘 위치에 화살이 3×3으로 빠른 속도로 떨어집니다. (범위 15블럭 이내)", "(쿨타임 7초) 자신이 포커스를 맞춘 위치에 화살이 5×5으로 빠른 속도로 떨어집니다. (범위 17블럭 이내)"]
  }, {
    //12
    name : "체력 증가 (패시브)",
    detail : ["최대체력이 3칸 증가합니다.", "최대체력이 5칸 증가합니다.", "최대체력이 10칸 증가합니다."]
  }, {
    //13
    name : "파괴력 증가 (버프)", //가명(이름 미정)
    detail : ["(쿨타임 30초) 10초 간 최대체력이 5칸으로 감소하며 힘1의 버프를 받습니다.", "(쿨타임 35초) 10초 간 최대체력이 7칸으로 감소하며 힘1의 버프를 받습니다.", "(쿨타임 45초) 15초간 최대체력이 7칸으로 감소하며 힘2의 버프를 받습니다."]
  }, {
    //14
    name : "파이어 볼 (액티브)",
    detail : ["(쿨타임 10초) 자신이 보는 방향으로 화염구를 빠른 속도로 날립니다. 화염구가 맞은 곳에 작은 폭발이 일어납니다.", "(쿨타임 15초) 자신이 보는 방향으로 화염구 를 빠른 속도로 날립니다. 화염구가 맞은 곳에 작은 폭발이 일어나며 주위의 플레이어에게 구속1 버프를 2초간 부여합니다.", "(쿨타임 30초) 자신이 보는 방향으로 화염구 2발을 빠른 속도로 날립니다. 화염구가 맞은 곳에 작은 폭발이 일어나며 주위의 플레이어에게 구속1 버프를 5초간 부여합니다. 각각의 화염구의 파괴력이 약 30% 감소합니다."]
  }, {
  	  //15
  	  name : "화살 (패시브 / 액티브)",
  	  detail : ["(쿨타임 30초) 자신에게 활과 화살 16개가 주어집니다. 능력 사용시 자신이 보는 방향으로 강력한 화살이 1발 나갑니다.","(쿨타임 30초) 자신에게 활과 화살 32개가 주어집니다. 능력 사용시 자신이 보는 방향으로 강력한 화살이 1발 나갑니다.","(쿨타임 25초) 자신에게 활과 화살 32개가 주어집니다. 능력 사용시 자신이 보는 방향으로 강력한 불화살이 1발 나갑니다."]
  }, {
  	  //16
  	  name : "힐 (버프)",
  	  detail : ["(쿨타임 25초) 자신에게 40%의 확률로 재생1의 버프를 7초 간, 남은 50%의 확률로 즉시회복1의 버프를 부여합니다. 10%의 확률로 아무 효과도 부여되지 않습니다.", "(쿨타임 35초) 자신에게 35%의 확률로 재생1의 버프를 15초 간, 남은 60%의 확률로 즉시회복2의 버프를 부여합니다. 5%의 확률로 아무 효과도 부여되지 않습니다.", "(쿨타임 1분) 자신에게 45%의 확률로 재생2의 버프를 10초 간, 남은 55%의 확률로 즉시회복4의 버프를 부여합니다."]
  }
];

function entityAddedHook(ent) {
  if(Player.isPlayer(ent)) {
    player.push(ent);
  }
}

function procCmd(cmd) {
  cmd = cmd.split(" ");
  if(cmd[0].equals("es")) {
    if(cmd.length < 2 || cmd[1].equals("")) {
      clientMessage("/es start : 게임을 시작합니다." + \n + "/es stop : 게임을 중지시킵니다." + \n + "/es help : 현재 자신의 능력을 확인합니다." + \n + "/es obs <닉네임> : 닉네임이 <닉네임>인 플레이어를 관전자목록에 추가시킵니다.");
      return;
    }
    if(cmd[1].equals("start")) {
      startGame();
    }
    if(cmd[1].equals("stop")) {
      stopGame();
    }
    if(cmd[1].equals("help")) {

    }
    if(cmd[1].equals("obs")) {
      if(cmd.length < 3 || cmd[2].equals("")) {
        clientMessage("/es obs <닉네임>");
        return;
      }
      for(var i in observer) {
      	  if(cmd[2].equals(Player.getName(observer[i]))) {
      	  observer.splice(observer.indexOf);
      	  net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(cmd[2] + " 님이 관전자 목록에서 제거되었습니다.");
      	  return;
      }
      for(var i in player) {
        if(cmd[2].equals(Player.getName(player[i]) {
          observer.push(player[i]);
          net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(cmd[2] + " 님이 관전자 목록에 등록되었습니다.");
          player.splice(i,1);
        }
      }
      if(observer.length < 1) {
        clientMessage("해당하는 플레이어가 없습니다.");
      }
    }
  }
}

function Esper(ent, ability, level) {
  this.ent = ent;
  this.ability = ability;
  this level = level;
}
Esper.prototype = {
  getAbility : function() {
    return this.ability;
  },
  getEntity : function() {
    return this.ent;
  },
  getLevel : function() {
    return this.level;
  },
  getX : function() {
    return Entity.getX(this.ent);
  },
  getY : function() {
    return Entity.getY(this.ent);
  },
  getZ : function() {
    return Entity.getZ(this.ent);
  }
}

function startGame() {
  if(player.length >= 3) {
    if(player.length <= 16) {
      if(isPlaying) {
        var setAbility = new Array();
        for(var i in AbilityList) {
          setAbility.push(AbilityList[i]);
        }
        var check = new Array();
        for(var i in player) {
          var r = Math.floor(Math.random() * (setAbility.length - 1));
          while(check.indexOf(r) < 0) {
            r = Math.floor(Math.random() * (setAbility.length - 1));
          }
          esper.push(new Esper(player[i], r, 0));
          check.push(r);
        }
        isPlaying = true;
        net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat("능력이 할당되었습니다. 잠시 후 게임을 시작합니다." + \n + "/va help 명령어로 능력을 확인하실 수 있습니다.");
      } else {
        clientMessage("이미 게임이 진행중입니다.");
      }
    } else {
      clientMessage("정원이 초과되었습니다. 관전자 설정을 다시 해주시길 바랍니다.");
    }
  } else {
    clientMessage("플레이어가 부족합니다.");
  }
}

function stopGame() {
  if(!isPlaying) {
    isPlaying = false;
    esper.splice(0, esper.length - 1);
    net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat("게임이 종료되었습니다.");
  }
}

function chatRecieveHook(sender, msg) {

}
