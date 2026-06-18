export function createBackgroundCanvas(width: number, height: number): HTMLCanvasElement {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');

  if (!context) {
    return canvas;
  }

  var gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#163d3b');
  gradient.addColorStop(0.52, '#232827');
  gradient.addColorStop(1, '#5b3326');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(255,255,255,0.08)';
  context.lineWidth = 1;
  for (var x = 0; x <= width; x += 50) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (var y = 0; y <= height; y += 50) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.fillStyle = 'rgba(242,196,109,0.16)';
  context.fillRect(40, 40, 920, 520);
  context.strokeStyle = 'rgba(242,196,109,0.45)';
  context.lineWidth = 3;
  context.strokeRect(40, 40, 920, 520);

  return canvas;
}

export function createActorFrameCanvas(
  size: number,
  frameIndex: number,
  frameCount: number,
): HTMLCanvasElement {
  var canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  var context = canvas.getContext('2d');

  if (!context) {
    return canvas;
  }

  var center = size / 2;
  var loopProgress = frameIndex / Math.max(frameCount, 1);
  var pulse = 0.5 - Math.cos(loopProgress * Math.PI * 2) / 2;
  var bodyRadius = size * (0.27 + pulse * 0.028);
  var glowRadius = size * (0.39 + pulse * 0.036);
  context.clearRect(0, 0, size, size);
  var glow = context.createRadialGradient(
    center,
    center,
    bodyRadius * 0.4,
    center,
    center,
    glowRadius,
  );
  glow.addColorStop(0, 'rgba(242,196,109,0.76)');
  glow.addColorStop(1, 'rgba(242,196,109,0)');
  context.fillStyle = glow;
  context.beginPath();
  context.arc(center, center, glowRadius, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#2a746f';
  context.strokeStyle = '#f7f7f4';
  context.lineWidth = size * 0.016;
  context.beginPath();
  context.arc(center, center, bodyRadius, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.fillStyle = '#f7f7f4';
  context.beginPath();
  context.arc(center - size * 0.07, center - size * 0.04, size * 0.025, 0, Math.PI * 2);
  context.arc(center + size * 0.07, center - size * 0.04, size * 0.025, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#f2c46d';
  context.fillRect(center - size * 0.2, center - size * 0.42, size * 0.4, size * 0.08);
  context.fillRect(center - size * 0.2, center + size * 0.34, size * 0.4, size * 0.08);

  return canvas;
}
