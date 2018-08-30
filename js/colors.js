
	var logo = $('#colors').text().split('');

	var rainbow = new Rainbow();
	rainbow.setSpectrum('#FFA07A','#CD5C5C');
	rainbow.setNumberRange(0, logo.length);
	for (i=0; i<logo.length; i++) 	{
	if (logo[i] === " ") {
	var p = document.createElement('p');
	var P = document.getElementById('logo');
	p.innerHTML = "&nbsp";
	p.className = "logo";
	p.style.cssFloat = "left";
	P.appendChild(p);
	} else {
	var color = rainbow.colourAt(i);
	var p = document.createElement('p');
	var P = document.getElementById('logo');
	p.innerHTML = logo[i];
	p.className = "logo";
	p.style.color = "#"+color;
	p.style.cssFloat = "left";
	P.appendChild(p);
	}
}