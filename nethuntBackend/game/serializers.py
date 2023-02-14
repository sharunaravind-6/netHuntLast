from .models import Info
class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = "__all__"
    # def create(self,validated_data):
    #     user = validated_data.pop('coordinator')
    #     user = NethuntUser.objects.create(**user)
    #     coordinator = coordinator.objects.create(user=user, **validated_data)
    #     return coordinator