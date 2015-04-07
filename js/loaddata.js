/**
 * Created by Gao  Zhiluo on 24/03/2015.
 */
$(document).ready( function() {
    function pageCount(data) {
	return Math.ceil(data.length/6);
    }
    $.getJSON( "4294857975.json", function( data ) {

        var description=[];
        var price=[];
        var imagesm=[];
        var imagelg=[];
        var bullet=[];
	var detail=new Array(9);
	for (var i = 0; i < 9; i++) { 
		detail[i] = new Array(); 
	} 

        for(var i=0;i<data.ProductsList.length;i++){
            description.push(data.ProductsList[i].ProductInfo.p_product_description);
            price.push(data.ProductsList[i].ProductInfo.p_product_price);
            imagesm.push(data.ProductsList[i].imageURLs.sm);
            imagelg.push(data.ProductsList[i].imageURLs.lg);


            bullet.push(data.ProductsList[i].ProductInfo.p_product_specs);
	    for(var p=0; p<data.ProductsList[i].ProductInfo.p_product_specs.Value.length; p++){
		if(data.ProductsList[i].ProductInfo.p_product_specs.Value[p].Value == "Yes")
			detail[i].push(data.ProductsList[i].ProductInfo.p_product_specs.Value[p]);
	    }
            $("#detailP").html(description[0]);
            var obj=new Number(price[0]);
            var obj2=obj.toFixed(2);
            $("#detailPrice").html("$"+obj2);

            $("#imageDetail").attr("src",imagelg[0]);
        }

            $("#detailBullet").append('<li>'+data.ProductsList[0].ProductInfo.p_product_specs.Value[0].Key+'</li>'+'<li>'+data.ProductsList[0].ProductInfo.p_product_specs.Value[1].Key+'</li>'+'<li>'+data.ProductsList[0].ProductInfo.p_product_specs.Value[2].Key+'</li>');

	
        for(var j=0;j<6;j++){
            var obj=new Number(price[j]);
            var obj2=obj.toFixed(2);
            console.log(j);
            var count=0;


            $('#list').append('<div id='+j+' class="col-md-4">'+'<div class="box1">'+'<img id="image" class="listImg"  data-img-lg= "'+imagelg[j]+'" src="'+imagesm[j]+'"  alt="image">'+
            '<p id="description" data-bullet-p="['+detail[j][3].Key+","+detail[j][5].Key+","+detail[j][6].Key+']">'+description[j]+'</p>'+
            '<p id="price">'+'$'+obj2+'</p>'+
            '<a id="aClick" href="#" class="item btn btn-info btn-lg"><span class="glyphicon glyphicon-search"></span> view more </a></div>');
        }
	var pageNumber = pageCount(description);
	for(var k=0;k<pageNumber;k++){
           $('.pagination').append('<li><a class="page" href="#" value='+k+'>'+(k+1)+'</a></li>');	    
	}
        $('.page').on('click',function(){
            var currentPage=$(this).attr("value");
	console.log(currentPage);
	$('#list').children().detach();
	var endPage;
	if(currentPage*6+6>data.ProductsList.length)
		endPage=data.ProductsList.length;
	else
		endPage=currentPage*6+6;
        for(var l=currentPage*6;l<endPage;l++){
            var obj=new Number(price[l]);
            var obj2=obj.toFixed(2);
            console.log(l);
            $('#list').append('<div id='+l+' class="col-md-4">'+'<div class="box1">'+'<img class="listImg" id="image" data-img-lg= "'+imagelg[l]+'" src="'+imagesm[l]+'"  alt="image">'+
            '<p id="description" data-bullet-p="['+detail[l][3].Key+","+detail[l][5].Key+","+detail[l][6].Key+']" >'+description[l]+'</p>'+
            '<p id="price">'+'$'+obj2+'</p>'+
            '<a href="#" id="aClick" class="item btn btn-info btn-lg"><span class="glyphicon glyphicon-search"></span> view more </a></div>');
        }
        $('#aClick, .listImg,#description, #price ').on('click mouseover',function(){
            console.log("11111");
            var parent=$(this).parent(".box1");
             console.log(parent.children("#description").text());
            $("#detailP").html(parent.children("#description").text());
            $("#detailPrice").html(parent.children("#price").text());
            var lg=parent.children("#image").attr("data-img-lg");
            $("#imageDetail").attr("src",lg);
            var pBullet=parent.children("#description").data("bullet-p").split(",");

            console.log(pBullet);
            console.log();
            $("#detailBullet").html('<li>'+pBullet[0].substring(1)+'</li>'+'<li>'+pBullet[1].toString()+'</li>'+'<li>'+pBullet[2].substring(0,pBullet[2].length-1)+'</li>');

            console.log(pBullet)
            console.log(pBullet[0]);

        })

        })
        $('#aClick,.listImg,#description, #price ').on('click mouseover',function(){
            console.log("11111");
            var parent=$(this).parent(".box1");
             console.log(parent.children("#description").text());
            $("#detailP").html(parent.children("#description").text());
            $("#detailPrice").html(parent.children("#price").text());
            var lg=parent.children("#image").attr("data-img-lg");
            $("#imageDetail").attr("src",lg);
            var pBullet=parent.children("#description").data("bullet-p").split(",");

            console.log(pBullet);
            console.log(pBullet.join(''));
            $("#detailBullet").html('<li>'+pBullet[0].substring(1)+'</li>'+'<li>'+pBullet[1].toString()+'</li>'+'<li>'+pBullet[2].substring(0,pBullet[2].length-1)+'</li>');
            console.log(pBullet)
            console.log(pBullet[0]);

        })

        $('#addCart ').on('click',function(){
            alert("The price of selected product is "+$(this).parent().find('#detailPrice').html());

        })
    });


});