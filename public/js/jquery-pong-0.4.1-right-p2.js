//TS customised for multiplayer
/**
 * jQuery Pong plugin
 *
 * @name    jquery-pong-0.4.1.js
 * @author  Geoffray Warnants - http://www.geoffray.be
 * @version 0.4.1
 * @date    20100127
 * @example http://www.geoffray.be/lab/pong
 *
 * @todo    Mieux tenir compte des options par défaut (+ initialisaiton via CSS)
 * @todo    Problèmes de positionnement si intégré dans une page avec du contenu
 * @todo    Gérer la fin de la partie
 * @todo    Mieux gérer l'accélération progressive de la difficulté
 */
(function($) {
 var socket = io.connect(window.location.hostname);
var speed;   
        var dx;
        var x;
        var y;


    $.version = "0.4.1";
    
    $.fn.pong = function(options) {
        
        return $(this).each(function() {
        
            var $this = $(this);
            
            var css_opts = {
                "width":$this.css("width"),
                "height":$this.css("height"),
                "background-color":$this.css("background-color"),
                "border-width":$this.css("border-width"),
                "pad-width":$this.css("border-width"),
                "pad-color":$this.css("color"),
                "ball-size":$this.css("border-width"),
                "ball-color":$this.css("color"),
                "font-family":$this.css("font-family"),
                "font-color":$this.css("color"),
                "border-color":$this.css("color")
            };
            
            var test_opts = $.extend({}, $.fn.pong.defaults, css_opts);
            //console.log(test_opts);
            
            // initialise les options
            var opts = $.extend({}, $.fn.pong.defaults, options);
            
            $this.data("pong_speed", opts.speed);
            $this.data("pong_playing", false);
            $this.data("pong_dx", 1);
            
            initScreen($this,opts);

            $this.data("x_min",$("#"+$this.attr("id")+"_player1").position().left+$("#"+$this.attr("id")+"_player1").width());
            $this.data("x_max",$("#"+$this.attr("id")+"_player2").position().left-$("#"+$this.attr("id")+"_ball").width());
            $this.data("y_min",0);
            $this.data("y_max",$this.height()-$("#"+$this.attr("id")+"_ball").width());

socket.on('player1', function () {        //TS player1
            $this.mousemove(onMousemove);
            $this.click(onClick);
		});
socket.on('player2', function () {        //TS player2  
            $this.mousemove(onMousemove2);
             $this.click(onClick2); 
		});
        });
    };
 
function onMousemove(e)
    {    
		
        var $this = $(this);
        if ($this.data("pong_playing")) {
            var y_rel = $(window).scrollTop()+(e.clientY-parseInt($this.offset().top));   // y relatif du curseur
            var y = y_rel-parseInt($("#"+$this.attr("id")+"_player1").height()/2);
            
            if (y<0) {
                y=0;
            } else if (y+$("#"+$this.attr("id")+"_player1").height() > $this.height()){
                y = ($this.height())-$("#"+$this.attr("id")+"_player1").height();
            }
            $("#"+$this.attr("id")+"_player1").css({"top":y});
            socket.emit('yPos', y);

    
};
}
            socket.on('yPos', function (data){
                y = data;
                $("#pong_player1").css({"top":y});  //TS move player1 y from top
            });

function onMousemove2(e)
    {    
        var $this = $(this);
        if ($this.data("pong_playing")) {
            var y_rel2 = $(window).scrollTop()+(e.clientY-parseInt($this.offset().top));   // y relatif du curseur
            var y2 = y_rel2-parseInt($("#"+$this.attr("id")+"_player2").height()/2);
            
            if (y2<0) {
                y2=0;
            } else if (y2+$("#"+$this.attr("id")+"_player2").height() > $this.height()){
                y2 = ($this.height())-$("#"+$this.attr("id")+"_player2").height();
            }
            $("#"+$this.attr("id")+"_player2").css({"top":y2});
            socket.emit('y2Pos', y2);

};
}

            socket.on('y2Pos', function (data){
                y2 = data;
                $("#pong_player2").css({"top":y2}); //TS move player 2 y from top
            });

    function onClick(e)
    {
        var $this = $(this);
        if (!$this.data("pong_playing")) {
            $this.data("pong_playing",true);
            $("#"+$this.attr("id")+"_title_box").css({"display":"none"});  //TS on screen logo disappears
            
              }   
    };
    
    function onClick2(e)
    {
        var $this = $(this);
        if (!$this.data("pong_playing")) {
            $this.data("pong_playing",true);
            $("#"+$this.attr("id")+"_title_box").css({"display":"none"});  //TS on screen logo disappears
            rebondir($this);  //TS only when p2 connects and clicks the game begins. P2 always serves
              }
    };
    
    function initScreen(obj,opts)
    {
        obj.css({"position":"relative","border-style":"solid","font-family":opts.font_family,"border-width":opts.border_width});
    
        if ((obj.css("background-color"))=="transparent") {
            obj.css({"background-color":opts.background_color});
        }

        if ((obj.css("border-color"))=="") {
            obj.css({"border-color":+opts.border_color});
        }
        
        // Construction de l'écran de jeu
        obj.append($("<div></div>").attr("id",obj.attr("id")+"_player1").css({"position":"absolute","width":opts.pad_width,"height":opts.pad_height,"background-color":opts.pad_color,"left":10,"top":(obj.height()/2)-opts.pad_height/2}));
        obj.append($("<div></div>").attr("id",obj.attr("id")+"_player2").css({"position":"absolute","width":opts.pad_width,"height":opts.pad_height,"background-color":opts.pad_color,"left":obj.width()-20,top:(obj.height()/2)-opts.pad_height/2}));
        obj.append($("<div></div>").attr("id",obj.attr("id")+"_ball").css({"position":"absolute","width":opts.ball_size,"height":opts.ball_size,"background-color":opts.ball_color}));
        obj.append($("<input>").css({"background-color":"transparent","color":obj.css("color"),"border":0,"position":"absolute","text-align":"center","width":100,"font-size":30,"font-weight":"bold","font-family":"Courier,Impact","left":(obj.width()/2)-120}).attr("type","text").attr("id",obj.attr("id")+"_score1").val(0)); 
        obj.append($("<input>").css({"background-color":"transparent","color":obj.css("color"),"border":0,"position":"absolute","text-align":"center","width":100,"font-size":30,"font-weight":"bold","font-family":"Courier,Impact","left":(obj.width()/2)+20}).attr("type","text").attr("id",obj.attr("id")+"_score2").val(0));

        obj.append(
            $("<div></div>").attr("id",obj.attr("id")+"_title_box").css({"position":"absolute","color":obj.css("color"),"text-align":"center","font-weight":"bold","width":obj.width(),"height":150,"top":(obj.height()/2)-75})
                .append(
                    $("<div></div>").attr("id",obj.attr("id")+"_title").css({"font-size":50}).html("Pong Tournament"))
                .append(
                    $("<div></div>")
                  
            )
        );
    }

    function rebondir($this) {

        var speed = $this.data("pong_speed");        
        var dx = $this.data("pong_dx");
        var x = $this.data((dx==1) ? "x_max" : "x_min"); 
        var y = Math.floor($this.data("y_min")+Math.random()*$this.data("y_max")-$this.data("y_min"));
        socket.emit('moveBall', {'x': x, 'y': y}); 																							//TS pass ball movement  to server
        $("#"+$this.attr("id")+"_ball").animate({"left":x,"top":y},speed,"linear",function(){
            $this.data("pong_dx", 0-$this.data("pong_dx"));
            if (dx==-1) {
                var y_min = parseInt($("#"+$this.attr("id")+"_player2").css("top"))-$("#"+$this.attr("id")+"_ball").height();
                var y_max = y_min+$("#"+$this.attr("id")+"_player2").height()+$("#"+$this.attr("id")+"_ball").height();
                if (y > y_min && y < y_max) {
                    $this.data("pong_speed", speed-50);
                } else {
                    $this.data("pong_playing", false);
                    $("#"+$this.attr("id")+"_score2").val(parseInt($("#"+$this.attr("id")+"_score2").val())+1);   
                    if ($("#"+$this.attr("id")+"_score2").val() >= 5) {
                        $("#"+$this.attr("id")+"_title").html("You loose");
                        $("#"+$this.attr("id")+"_title_msg").html("");
                        $("#"+$this.attr("id")+"_title_box").css({"display":"block"});
                        $('#score').children().remove();  //TS changing scores
                        score_counter--;
                        if(score_counter <0) score_counter = 0;
                        $('#score').append('<p>Your score is: ' + score_counter + '</p>');
                        $('#pong').remove(); //TS remove game field
                        	$('#options').append('<input type="button" value="Leave game" class="btn btn-danger" id="back_button" onclick="go_back();"/>'); //TS create back button (go to /game)
					
						
                    }
                    
                }
                
            } else {
            
                var y_min = parseInt($("#"+$this.attr("id")+"_player2").css("top"))-$("#"+$this.attr("id")+"_ball").height();
                var y_max = y_min+$("#"+$this.attr("id")+"_player2").height()+$("#"+$this.attr("id")+"_ball").height();
                if (y > y_min && y < y_max) {
                    $this.data("pong_speed", speed-50);
                } else {
                    $this.data("pong_playing", false);
                    $("#"+$this.attr("id")+"_score1").val(parseInt($("#"+$this.attr("id")+"_score1").val())+1);
                    $("#"+$this.attr("id")+"_player2").stop(); ////////////////////////////////////////////////////////////////////////////////////////////////////without this maybe??
                    if ($("#"+$this.attr("id")+"_score1").val() >= 5) {
                        $("#"+$this.attr("id")+"_title").html("You win");
                        $("#"+$this.attr("id")+"_title_msg").html("");
                        $("#"+$this.attr("id")+"_title_box").css({"display":"block"});
                          $('#score').children().remove();  //TS changing scores
                        score_counter++;
                        $('#pong').remove(); //TS remove game field
            $('#score').append('<p>Your score is: ' + score_counter + '</p>');
                        	$('#options').append('<input type="button" value="Leave game" class="btn btn-success" id="back_button" onclick="go_back();"/>'); //TS create back button (go to /game)
                    }
                }
            }
            
            if ($this.data("pong_playing")) {
                rebondir($this);
            }
            
        });
        
        if ($this.data("pong_playing")) {
            window.setTimeout(function() {
            }, Math.round((500-(2*speed))+Math.random()*(1000-(2*speed))));
        }
    }

    socket.on('moveBall', function (data){  //TS returning with the ball movement
        var $this = $('#pong');
        var speed = $this.data("pong_speed");        
        var dx = $this.data("pong_dx");
        var x = data.x;
        var y = data.y;
        $("#"+$this.attr("id")+"_ball").animate({"left":x,"top":y},speed,"linear",function(){
            $this.data("pong_dx", 0-$this.data("pong_dx"));
            if (dx==-1) {
                var y_min = parseInt($("#"+$this.attr("id")+"_player2").css("top"))-$("#"+$this.attr("id")+"_ball").height();
                var y_max = y_min+$("#"+$this.attr("id")+"_player2").height()+$("#"+$this.attr("id")+"_ball").height();
                if (y > y_min && y < y_max) {
                    $this.data("pong_speed", speed-50);
                } else {
                    $this.data("pong_playing", false);
                    $("#"+$this.attr("id")+"_score1").val(parseInt($("#"+$this.attr("id")+"_score1").val())+1);  //??????????????SWITCH TO P1 MAYBE?
                    if ($("#"+$this.attr("id")+"_score1").val() >= 5) {
                        $("#"+$this.attr("id")+"_title").html("You loose");
                        $("#"+$this.attr("id")+"_title_msg").html("");
                        $("#"+$this.attr("id")+"_title_box").css({"display":"block"});
                        $('#score').children().remove();  //TS changing scores
                        score_counter--;
                        if(score_counter <0) score_counter = 0;
                        $('#score').append('<p>Your score is: ' + score_counter + '</p>');
                        $('#pong').remove(); //TS remove game field
                            $('#options').append('<input type="button" value="Leave game" class="btn btn-danger" id="back_button" onclick="go_back();"/>'); //TS create back button (go to /game)
                    
                        
                    }
                    
                }
                
            } else {
            
                var y_min = parseInt($("#"+$this.attr("id")+"_player2").css("top"))-$("#"+$this.attr("id")+"_ball").height();
                var y_max = y_min+$("#"+$this.attr("id")+"_player2").height()+$("#"+$this.attr("id")+"_ball").height();
                if (y > y_min && y < y_max) {
                    $this.data("pong_speed", speed-50);
                } else {
                    $this.data("pong_playing", false);
                    $("#"+$this.attr("id")+"_score2").val(parseInt($("#"+$this.attr("id")+"_score2").val())+1);
                    $("#"+$this.attr("id")+"_player2").stop();																	/////////////////////////////STOPPED AGAIN WITHOUT TRIAL
                    if ($("#"+$this.attr("id")+"_score2").val() >= 5) {
                        $("#"+$this.attr("id")+"_title").html("You win");
                        $("#"+$this.attr("id")+"_title_msg").html("");
                        $("#"+$this.attr("id")+"_title_box").css({"display":"block"});
                          $('#score').children().remove();  //TS changing scores
                        score_counter++;
                        $('#pong').remove(); //TS remove game field
            $('#score').append('<p>Your score is: ' + score_counter + '</p>');
                            $('#options').append('<input type="button" value="Leave game" class="btn btn-success" id="back_button" onclick="go_back();"/>'); //TS create back button (go to /game)
                    }
                }
            }
            
            if ($this.data("pong_playing")) {
                rebondir($this);
            }
            
        });
        
        if ($this.data("pong_playing")) {
            window.setTimeout(function() {
            }, Math.round((500-(2*speed))+Math.random()*(1000-(2*speed))));
        }
    });

    // Valeurs par défaut des options
    $.fn.pong.defaults = {
        "width": 640,                    // Largeur de l'écran de jeu
        "height": 480,                   // Hauteur de l'écran de jeu
        "background_color": "#000000",   // Couleur d'arrière plan
        "border_width": 10,              // Largeur des bordures
        "pad_width": 10,                 // Largeur des paddles
        "pad_height": 100,               // Hauteur des paddles
        "pad_color": "#ffffff",          // Couleur des paddles
        "ball_size": 10,                 // Taille de la balle
        "ball_color": "#ffffff",         // Couleur de la balle
        "font_family": "Courier,Impact", // Police
        "font_color": "#ffffff",         // Couleur du texte
        "border_color": "#ffffff",       // Couleur des bordures de l'écran de jeu
        "speed": 2000                    // Vitesse de la balle
    };

})(jQuery);
