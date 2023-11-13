var Helpers = {
  item_is_in_array: function(item, array) {
    var alength = array.length;
    for (var i=0; i < alength; i++) {
      if (array[i] === item) {
        return true;
      }
    }
    return false;
  },
  // Check if browser supporst localStorage
  // Taken from Modernizr: http://goo.gl/VwVXE
  localStorageSupported: function() {
    try {
      return !!localStorage.getItem;
    } catch(e) {
      return false;
    }
  }
},
ObliqueStrategies = function() {
  var strategies = ["A line has two sides", "Abandon desire", "Abandon normal instructions", "Accept advice", "Adding on", "Always the first steps", "Ask people to work against their better judgement", "Ask your body", "Be dirty", "Be extravagant", "Be less critical", "Breathe more deeply", "Bridges -build -burn", "Change ambiguities to specifics", "Change nothing and continue consistently", "Change specifics to ambiguities", "Consider transitions", "Courage!", "Cut a vital connection", "Decorate", "Destroy nothing; Destroy the most important thing", "Discard an axiom", "Disciplined self-indulgence", "Discover your formulas and abandon them", "Display your talent", "Distort time", "Do nothing for as long as possible", "Do something boring", "Do something sudden", "Do the last thing first", "Do the words need changing?", "Don't avoid what is easy", "Don't break the silence", "Don't stress one thing more than another", "Emphasize differences", "Emphasize the flaws", "Faced with a choice", "Find a safe part and use it as an anchor", "Give the game away", "Give way to your worst impulse", "Go outside. Shut the door.", "Go outside. Shut the door.", "Go to an extreme", "How would someone else do it?", "How would you have done it?", "In total darkness", "Is it finished?", "Is something missing?", "Is the style right?", "It is simply a matter of work", "Just carry on", "Listen to the quiet voice", "Look at the order in which you do things", "Magnify the most difficult details", "Make it more sensual", "Make what's perfect more human", "Move towards the unimportant", "Not building a wall; making a brick", "Once the search has begun", "Only a part", "Only one element of each kind", "Openly resist change", "Pae White's non-blank graphic metacard", "Question the heroic", "Remember quiet evenings", "Remove a restriction", "Repetition is a form of change", "Retrace your steps", "Reverse", "Simple Subtraction", "Slow preparation", "State the problem as clearly as possible", "Take a break", "Take away the important parts", "The inconsistency principle", "The most easily forgotten thing is the most important", "Think - inside the work -outside the work", "Tidy up", "Try faking it", "Turn it upside down", "Use 'unqualified' people", "Use an old idea", "Use cliches", "Use filters", "Use something nearby as a model", "Use your own ideas", "Voice your suspicions", "Water", "What context would look right?", "What is the simplest solution?", "What mistakes did you make last time?", "What to increase? What to reduce? What to maintain?", "What were you really thinking about just now?", "What would your closest friend do?", "What wouldn't you do?", "When is it for?", "Where is the edge?", "Which parts can be grouped?", "Work at a different speed", "Would anyone want it?", "Your mistake was a hidden intention"],
      num_strategies = strategies.length,
      current_strategy,
      fonts = ["RalewayThin", "CrimsonRoman", "Cuprum", "YanoneKaffeesatzRegular", "JosefinSansStdLight", "BellezaRegular", "OpenSansRegular"],
      $container = $("#container"),
      $obstrat = $("#oblique-strategy"),
      $faves = $("ul#faves"),
      $about = $("#about-content"),
  init = function() {
      addListeners();
      display_random();
      $("body").addClass("one-strategy");
      Display.set_bg();
      if (!Helpers.localStorageSupported) {
        $("body").addClass("nolocalstorage");
      }
      if ('ontouchstart' in document) {
        $("body").removeClass('no-touch');
      }
      set_ios_title();
  },
  set_ios_title = function() { /* Set's short <title> for iOS to be used as "app name" when web app added to home screen. */
    var nav = navigator,
    isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
    $title = $("title");
    if (isIDevice) {
      $title.text($title.data("ios-title"));
    }
  },
  center_strategy = function() {
    var container_height = $container.height(),
        strategy_height = $obstrat.height();
    $obstrat.css("marginTop", -1 * (strategy_height / 2));
    $obstrat.css("top", "50%");
  },
  add_fave = function() {
    // Add strategy to local store list
    var faves = get_faves();
    // Add current strategy to faves list
    if (!Helpers.item_is_in_array(current_strategy, faves)) {
      faves.push(current_strategy);
    }
    // Save updated list in local storage
    obstrat = localStorage.setItem('oblique_strategies_faves', JSON.stringify(faves));
    fave_color_icon();
  },
  get_faves = function() {
    return JSON.parse(localStorage.getItem('oblique_strategies_faves')) || [];
  },
  clear_faves = function() {
    localStorage.removeItem('oblique_strategies_faves');
  },
  fave_color_icon = function() { /* Colors the icon if this strategy is in user's fave list */
    var faves = get_faves();
    if (Helpers.item_is_in_array(current_strategy, faves)) {
      $("#fave").addClass("is-user-fave");
    } else {
      $("#fave").removeClass("is-user-fave");
    }
  },
  random_strategy = function() {
    var rand_strategy_index = Math.floor(Math.random()*num_strategies);
    return strategies[rand_strategy_index];
  },
  random_font = function() {
    var rand_font_index = Math.floor(Math.random()*fonts.length);
    $obstrat.css("fontFamily", fonts[rand_font_index]);
  },
  display_random = function() {
    current_strategy = random_strategy();
    $obstrat.text(current_strategy);
    random_font();
    center_strategy();
    Display.set_bg();
    fave_color_icon();
  },
  populate_faves = function() {
    var faves = get_faves(),
        flength = faves.length;
    $faves.html(""); // Clear any HTML
    if (flength === 0) {
      $faves.html("<li>No faves yet. Why don't you add some?</li>");
    }
    for (var i=0; i < flength; i++) {
      $faves.append("<li>" + faves[i] + "</li>");
    }
  },
  addListeners = function() {
    // "Hover" for touch devices
    $("#strat-nav li").bind("touchstart", function(){
      $(this).addClass("active");
    });
    $("#strat-nav li").bind("touchend", function(){
      $(this).removeClass("active");
    });
    $("#strat-nav #random a").live("click", function(){
      $("body").addClass("one-strategy");
      $("body").removeClass("strategy-list");
      display_random();
      $about.hide();
      window.fathom && window.fathom.trackGoal('YSNLL0TF', 0);
    });
    $("#strat-nav #fave a").live("click", function(){
      add_fave();
      $about.hide();
      window.fathom && window.fathom.trackGoal('EGPE1KA0', 0);
    });
    $("#strat-nav #view-faves a").live("click", function(){
      $("body").addClass("strategy-list");
      $("body").removeClass("one-strategy");
      populate_faves();
      $about.hide();
      window.fathom && window.fathom.trackGoal('4NZCRIAG', 0);
    });
    $("#strat-nav #clear-faves a").live("click", function(){
      var confirmed = confirm('Are you sure you want to clear your faves?');
      if(confirmed) {
        clear_faves();
        populate_faves();
        $about.hide();
      }
      window.fathom && window.fathom.trackGoal('DTAMFUAX', 0);
    });
    $("#strat-nav #about a").live("click", function(){
      $about.show();
      window.fathom && window.fathom.trackGoal('M0BKDFRC', 0);
    });
    $("#about-content .close").live("click", function(){
      $about.hide();
      window.fathom && window.fathom.trackGoal('ECQTPBSN', 0);
    });
  };
  init();
  return {
    get_random: function() {
      return random_strategy();
    }
  };
},
Display = {
  set_bg: function() {
    //$("body").css("background", Display.random_rgba());
    $("body").css("background", "rgba(0,0,0,1.0)");
  },
  random_rgba: function() {
    var randr = Math.floor((Math.random()*255)+1),
        randg = Math.floor((Math.random()*255)+1),
        randb = Math.floor((Math.random()*255)+1),
        randa = Math.floor((Math.random()*9)+1)/10,
    rand_rgba = "rgba(" + randr + ", " + randg + ", " + randb + ", " + randa + ")";
    return rand_rgba;
  }
};

var obstrat = ObliqueStrategies();


// plugins.js
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

// addtohome.js
/*!
 * Add to Homescreen v2.0.1 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var addToHome = (function (w) {
  var nav = w.navigator,
    isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
    isIPad,
    isRetina,
    isSafari,
    isStandalone,
    OSVersion,
    startX = 0,
    startY = 0,
    lastVisit = 0,
    isExpired,
    isSessionActive,
    isReturningVisitor,
    balloon,
    overrideChecks,

    positionInterval,
    closeTimeout,

    options = {
      autostart: true,      // Automatically open the balloon
      returningVisitor: false,  // Show the balloon to returning visitors only (setting this to true is HIGHLY RECCOMENDED)
      animationIn: 'drop',    // drop || bubble || fade
      animationOut: 'fade',   // drop || bubble || fade
      startDelay: 2000,     // 2 seconds from page load before the balloon appears
      lifespan: 15000,      // 15 seconds before it is automatically destroyed
      bottomOffset: 14,     // Distance of the balloon from bottom
      expire: 0,          // Minutes to wait before showing the popup again (0 = always displayed)
      message: '',        // Customize your message or force a language ('' = automatic)
      touchIcon: false,     // Display the touch icon
      arrow: true,        // Display the balloon arrow
      hookOnLoad: true,     // Should we hook to onload event? (really advanced usage)
      iterations: 100       // Internal/debug use
    },

    intl = {
      ca_es: 'Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d\'inici</strong>.',
      cs_cz: 'Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.',
      da_dk: 'Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
      de_de: 'Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.',
      el_gr: 'Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.',
      en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
      es_es: 'Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.',
      fi_fi: 'Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.',
      fr_fr: 'Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l\'écran d\'accueil</strong>.',
      he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
      hu_hu: 'Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.',
      it_it: 'Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.',
      ja_jp: 'このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。',
      ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
      nb_no: 'Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>',
      nl_nl: 'Installeer deze webapp op uw %device: tik %icon en dan <strong>Zet in beginscherm</strong>.',
      pl_pl: 'Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.',
      pt_br: 'Instale este web app em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.',
      pt_pt: 'Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.',
      ru_ru: 'Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.',
      sv_se: 'Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
      th_th: 'ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>',
      tr_tr: '%device için bu uygulamayı kurduktan sonra %icon simgesine dokunarak <strong>Ana Ekrana Ekle</strong>yin.',
      zh_cn: '您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。',
      zh_tw: '您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。'
    };

  function init () {
    // Preliminary check, prevents all further checks to be performed on iDevices only
    if ( !isIDevice ) return;

    var now = Date.now(),
      i;

    // Merge local with global options
    if (w.addToHomeConfig) {
      for ( i in w.addToHomeConfig ) {
        options[i] = w.addToHomeConfig[i];
      }
    }
    if ( !options.autostart ) options.hookOnLoad = false;

    isIPad = (/ipad/gi).test(nav.platform);
    isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
    isSafari = nav.appVersion.match(/Safari/gi);
    isStandalone = nav.standalone;

    OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
    OSVersion = OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;

    lastVisit = +w.localStorage.getItem('addToHome');

    isSessionActive = w.sessionStorage.getItem('addToHomeSession');
    isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28*24*60*60*1000 > now : true;

    if ( !lastVisit ) lastVisit = now;

    // If it is expired we need to reissue a new balloon
    isExpired = isReturningVisitor && lastVisit <= now;

    if ( options.hookOnLoad ) w.addEventListener('load', loaded, false);
    else if ( !options.hookOnLoad && options.autostart ) loaded();
  }

  function loaded () {
    w.removeEventListener('load', loaded, false);

    if ( !isReturningVisitor ) w.localStorage.setItem('addToHome', Date.now());
    else if ( options.expire && isExpired ) w.localStorage.setItem('addToHome', Date.now() + options.expire * 60000);

    if ( !overrideChecks && ( !isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor ) ) return;

    var icons = options.touchIcon ? document.querySelectorAll('head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]') : [],
      sizes,
      touchIcon = '',
      closeButton,
      platform = nav.platform.split(' ')[0],
      language = nav.language.replace('-', '_'),
      i, l;

    balloon = document.createElement('div');
    balloon.id = 'addToHomeScreen';
    balloon.style.cssText += 'left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:' + (OSVersion < 5 ? 'absolute' : 'fixed');

    // Localize message
    if ( options.message in intl ) {    // You may force a language despite the user's locale
      language = options.message;
      options.message = '';
    }
    if ( options.message === '' ) {     // We look for a suitable language (defaulted to en_us)
      options.message = language in intl ? intl[language] : intl['en_us'];
    }

    // Search for the apple-touch-icon
    if ( icons.length ) {
      for ( i = 0, l = icons.length; i < l; i++ ) {
        sizes = icons[i].getAttribute('sizes');

        if ( sizes ) {
          if ( isRetina && sizes == '114x114' ) {
            touchIcon = icons[i].href;
            break;
          }
        } else {
          touchIcon = icons[i].href;
        }
      }

      touchIcon = '<span style="background-image:url(' + touchIcon + ')" class="addToHomeTouchIcon"></span>';
    }

    balloon.className = (isIPad ? 'addToHomeIpad' : 'addToHomeIphone') + (touchIcon ? ' addToHomeWide' : '');
    balloon.innerHTML = touchIcon +
      options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') +
      (options.arrow ? '<span class="addToHomeArrow"></span>' : '') +
      '<span class="addToHomeClose">\u00D7</span>';

    document.body.appendChild(balloon);

    // Add the close action
    closeButton = balloon.querySelector('.addToHomeClose');
    if ( closeButton ) closeButton.addEventListener('click', clicked, false);

    setTimeout(show, options.startDelay);
  }

  function show () {
    var duration,
      iPadXShift = 160;

    // Set the initial position
    if ( isIPad ) {
      if ( OSVersion < 5 ) {
        startY = w.scrollY;
        startX = w.scrollX;
        iPadXShift = 208;
      }

      balloon.style.top = startY + options.bottomOffset + 'px';
      balloon.style.left = startX + iPadXShift - Math.round(balloon.offsetWidth / 2) + 'px';

      switch ( options.animationIn ) {
        case 'drop':
          duration = '0.6s';
          balloon.style.webkitTransform = 'translate3d(0,' + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + 'px,0)';
          break;
        case 'bubble':
          duration = '0.6s';
          balloon.style.opacity = '0';
          balloon.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
          break;
        default:
          duration = '1s';
          balloon.style.opacity = '0';
      }
    } else {
      startY = w.innerHeight + w.scrollY;

      if ( OSVersion < 5 ) {
        startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
        balloon.style.left = startX + 'px';
        balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + 'px';
      } else {
        balloon.style.left = '50%';
        balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) + 'px';
        balloon.style.bottom = options.bottomOffset + 'px';
      }

      switch (options.animationIn) {
        case 'drop':
          duration = '1s';
          balloon.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
          break;
        case 'bubble':
          duration = '0.6s';
          balloon.style.webkitTransform = 'translate3d(0,' + (balloon.offsetHeight + options.bottomOffset + 50) + 'px,0)';
          break;
        default:
          duration = '1s';
          balloon.style.opacity = '0';
      }
    }

    balloon.offsetHeight; // repaint trick
    balloon.style.webkitTransitionDuration = duration;
    balloon.style.opacity = '1';
    balloon.style.webkitTransform = 'translate3d(0,0,0)';
    balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);

    closeTimeout = setTimeout(close, options.lifespan);
  }

  function manualShow (override) {
    if ( !isIDevice || balloon ) return;

    overrideChecks = override;
    loaded();
  }

  function close () {
    clearInterval( positionInterval );
    clearTimeout( closeTimeout );
    closeTimeout = null;

    var posY = 0,
      posX = 0,
      opacity = '1',
      duration = '0',
      closeButton = balloon.querySelector('.addToHomeClose');

    if ( closeButton ) closeButton.removeEventListener('click', close, false);

    if ( OSVersion < 5 ) {
      posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
      posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth)/2) - startX;
    }

    balloon.style.webkitTransitionProperty = '-webkit-transform,opacity';

    switch ( options.animationOut ) {
      case 'drop':
        if ( isIPad ) {
          duration = '0.4s';
          opacity = '0';
          posY = posY + 50;
        } else {
          duration = '0.6s';
          posY = posY + balloon.offsetHeight + options.bottomOffset + 50;
        }
        break;
      case 'bubble':
        if ( isIPad ) {
          duration = '0.8s';
          posY = posY - balloon.offsetHeight - options.bottomOffset - 50;
        } else {
          duration = '0.4s';
          opacity = '0';
          posY = posY - 50;
        }
        break;
      default:
        duration = '0.8s';
        opacity = '0';
    }

    balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);
    balloon.style.opacity = opacity;
    balloon.style.webkitTransitionDuration = duration;
    balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
  }


  function clicked () {
    w.sessionStorage.setItem('addToHomeSession', '1');
    isSessionActive = true;
    close();
  }

  function transitionEnd () {
    balloon.removeEventListener('webkitTransitionEnd', transitionEnd, false);

    balloon.style.webkitTransitionProperty = '-webkit-transform';
    balloon.style.webkitTransitionDuration = '0.2s';

    // We reached the end!
    if ( !closeTimeout ) {
      balloon.parentNode.removeChild(balloon);
      balloon = null;
      return;
    }

    // On iOS 4 we start checking the element position
    if ( OSVersion < 5 && closeTimeout ) positionInterval = setInterval(setPosition, options.iterations);
  }

  function setPosition () {
    var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
      posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
      posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;

    // Screen didn't move
    if ( posY == matrix.m42 && posX == matrix.m41 ) return;

    balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
  }

  // Clear local and session storages (this is useful primarily in development)
  function reset () {
    w.localStorage.removeItem('addToHome');
    w.sessionStorage.removeItem('addToHomeSession');
  }

  // Bootstrap!
  init();

  return {
    show: manualShow,
    close: close,
    reset: reset
  };
})(this);
