function CollisionDetector(A, B)
{
	var collisionX = 0;
	var collisionY = 0;

	var collision = function() {
			var minVerticalDistance,
				minHorizontalDistance,
				verticalDistance,
				horizontalDistance,
				horizontalDistanceAbs,
				verticalDistanceAbs,
				deltaHorizontal = 0,
				deltaVertical = 0;

			minHorizontalDistance = A.width / 2 + B.width / 2;
			minVerticalDistance = A.height / 2 + B.height / 2;

			horizontalDistance = A.position.x - B.position.x;
			verticalDistance = A.position.y - B.position.y;

			horizontalDistanceAbs = Math.abs(horizontalDistance);
			verticalDistanceAbs = Math.abs(verticalDistance);

			if(minHorizontalDistance <= horizontalDistanceAbs || minVerticalDistance <= verticalDistanceAbs) {
				return;
			}

			if(minHorizontalDistance > horizontalDistanceAbs) {
				deltaHorizontal = minHorizontalDistance - horizontalDistanceAbs;
			}

			if(minVerticalDistance > verticalDistanceAbs) {
				deltaVertical = minVerticalDistance - verticalDistanceAbs;
			}

			if(deltaHorizontal > deltaVertical) {
				if(A.position.y > B.position.y) {
					// Gurni ga gore
					collisionY = deltaVertical * -1;
				} else {
					// Gurni ga dolje
					collisionY = deltaVertical;
				}
			} else {
				if(A.position.x > B.position.x) {
					// onda ga gurni ljevo
					collisionX = deltaHorizontal * -1;
				} else {
					// Gurni ga desno
					collisionX = deltaHorizontal;
				}
			}
		}

	this.collision = function() {
		if(!!collisionX || !!collisionY) {
			return {x: collisionX, y: collisionY};
		}

		return null;
	}

	collision();
}